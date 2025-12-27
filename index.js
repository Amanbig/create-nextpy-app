#!/usr/bin/env node
import { program } from "commander";
import figlet from "figlet";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import npm from "npm-programmatic";
import { exec } from "child_process";
import { promisify } from "util";
import os from "os";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Detect operating system
const isWindows = os.platform() === "win32";

console.log(chalk.cyan(figlet.textSync("NextPy")));

program
  .name("create-nextpy-app")
  .description("CLI tool to generate nextjs frontend with python backend")
  .version("1.1.2")
  .option("-p, --project <name>", "Specify project name")
  .option("-l, --language <type>", "Specify language (JavaScript, TypeScript)")
  .option("-t, --tailwind <type>", "Specify whether to use tailwind")
  .option("-r, --api <type>", "Specify api framework (FastAPI, RunAPI)")
  .option("-f, --force", "Force overwrite of existing files without prompting");

async function promptInputs(options) {
  const questions = [];

  if (!options.project) {
    questions.push({
      type: "input",
      name: "project",
      message: chalk.green("What is your project name?"),
      prefix: "📋",
      default: "my-app",
      validate: (input) =>
        input.trim() ? true : "Project name cannot be empty",
    });
  }

  if (!options.language) {
    questions.push({
      type: "list",
      name: "language",
      message: chalk.green("Which language do you want to use?"),
      prefix: "💻",
      choices: ["JavaScript", "TypeScript"],
    });
  }

  if (!options.tailwind) {
    questions.push({
      type: "list",
      name: "tailwind",
      message: chalk.green("Do you want to use Tailwind CSS?"),
      prefix: "🎨",
      choices: ["Yes", "No"],
    });
  }

  if (!options.api) {
    questions.push({
      type: "list",
      name: "api",
      message: chalk.green("Which API framework do you want to use?"),
      prefix: "🎨",
      choices: ["FastAPI", "RunAPI"],
    });
  }

  return inquirer.prompt(questions);
}

async function createProjectStructure(
  projectName,
  languageChoice = "JavaScript",
  useTailwind = false,
  api = "RunAPI",
) {
  const frontendTemplateDir = path.join(__dirname, "frontend_folder");
  const projectPath = path.join(process.cwd(), projectName);
  const frontendPath = path.join(projectPath, "frontend");
  const backendPath = path.join(projectPath, "backend");
  const mainTemplatePath = path.join(__dirname, "main_folder");
  const spinner = ora("Creating project structure...").start();

  await fs.mkdir(projectPath, { recursive: true });
  await fs.mkdir(frontendPath);
  await fs.mkdir(backendPath);

  try {
    // git initialization in project root with error handling
    try {
      await execAsync("git init", { cwd: projectPath });
      spinner.text = "Git repository initialized...";
    } catch (gitError) {
      spinner.warn(
        chalk.yellow("Git initialization failed - continuing without git..."),
      );
      console.log(
        chalk.yellow(
          "⚠️  Git not found or failed to initialize. You can initialize git manually later with: git init",
        ),
      );
    }

    // Detect Python command
    spinner.text = "Detecting Python installation...";
    let pythonCmd = "python";
    try {
      await execAsync("python --version", { cwd: backendPath });
    } catch (error) {
      try {
        await execAsync("python3 --version", { cwd: backendPath });
        pythonCmd = "python3";
      } catch (error2) {
        throw new Error(
          "Python not found. Please install Python and ensure it's in your PATH.",
        );
      }
    }

    // backend setup with OS-specific commands
    spinner.text = "Setting up Python virtual environment...";
    await execAsync(`${pythonCmd} -m venv venv`, { cwd: backendPath });

    // copy backend boilerplate files
    spinner.text = "Setting up backend files...";
    if (api === "FastAPI") {
      const backendTemplateDir = path.join(__dirname, "fastapi_folder");
      const files = ["requirements.txt", "app.py", "package.json", "README.md"];
      for (const file of files) {
        await fs.cp(
          path.join(backendTemplateDir, file),
          path.join(backendPath, file),
        );
      }

      // Copy environment template as .env (npm ignores .env files during publish)
      await fs.cp(
        path.join(backendTemplateDir, ".env.template"),
        path.join(backendPath, ".env"),
      );

      // Copy gitignore template as .gitignore (npm ignores .gitignore files during publish)
      await fs.cp(
        path.join(backendTemplateDir, "gitignore.template"),
        path.join(backendPath, ".gitignore"),
      );

      // Install requirements using OS-specific path
      spinner.text = "Installing Python dependencies...";
      const pipPath = isWindows ? "venv\\Scripts\\pip" : "venv/bin/pip";
      await execAsync(`${pipPath} install -r requirements.txt`, {
        cwd: backendPath,
      });
    } else if (api === "RunAPI") {
      // Install RunAPI using OS-specific pip path
      spinner.text = "Installing RunAPI...";
      const pipPath = isWindows ? "venv\\Scripts\\pip" : "venv/bin/pip";
      await execAsync(`${pipPath} install runapi`, { cwd: backendPath });

      // Initialize RunAPI project using RunAPI's built-in CLI
      spinner.text = "Initializing RunAPI project...";
      const runapiPath = isWindows
        ? "venv\\Scripts\\runapi"
        : "venv/bin/runapi";

      try {
        // Create a temporary project with the name, then move contents to current directory
        const tempProjectName = `temp_${projectName}`;

        // Set UTF-8 encoding environment for Windows to handle Unicode emojis in RunAPI output
        const execOptions = {
          cwd: backendPath,
          env: {
            ...process.env,
            PYTHONIOENCODING: "utf-8",
            PYTHONUTF8: "1",
          },
        };

        try {
          await execAsync(`${runapiPath} init ${tempProjectName}`, execOptions);
        } catch (unicodeError) {
          // Fallback: Try with output redirection to avoid Unicode issues
          spinner.text =
            "Retrying RunAPI initialization with fallback method...";
          const fallbackCommand = isWindows
            ? `${runapiPath} init ${tempProjectName} > nul 2>&1`
            : `${runapiPath} init ${tempProjectName} > /dev/null 2>&1`;
          await execAsync(fallbackCommand, { cwd: backendPath });
        }

        // Move all files from the temp directory to the current backend directory
        const tempProjectPath = path.join(backendPath, tempProjectName);
        const files = await fs.readdir(tempProjectPath);

        for (const file of files) {
          const srcPath = path.join(tempProjectPath, file);
          const destPath = path.join(backendPath, file);
          await fs.cp(srcPath, destPath, { recursive: true });
        }

        // Remove the temporary directory
        await fs.rm(tempProjectPath, { recursive: true, force: true });
      } catch (runapiError) {
        spinner.fail(chalk.red("Failed to initialize RunAPI project"));
        console.error(chalk.yellow("RunAPI initialization error:"));
        console.error(chalk.red(runapiError.message));
        console.error(chalk.yellow("\n💡 Possible solutions:"));
        console.error(
          chalk.white(
            "1. Ensure RunAPI is properly installed: pip install runapi",
          ),
        );
        console.error(
          chalk.white("2. Try activating the virtual environment manually:"),
        );
        if (isWindows) {
          console.error(chalk.gray("   venv\\Scripts\\activate"));
        } else {
          console.error(chalk.gray("   source venv/bin/activate"));
        }
        console.error(chalk.white("3. Run the initialization manually:"));
        console.error(chalk.gray(`   runapi init ${projectName}`));
        throw runapiError;
      }

      // Copy package.json for npm scripts
      const backendTemplateDir = path.join(__dirname, "runapi_folder");
      await fs.cp(
        path.join(backendTemplateDir, "package.json"),
        path.join(backendPath, "package.json"),
      );
    }

    // frontend setup
    spinner.text =
      "Creating NextJS application (this may take a few minutes)...";
    const langFlag =
      languageChoice === "TypeScript" ? "--typescript" : "--javascript";
    const twFlag = useTailwind === "Yes" ? "--tailwind" : "";

    // Use more reliable flags and timeout handling
    const createNextCommand = `npx create-next-app@latest frontend ${langFlag} ${twFlag} --eslint --app --src-dir --import-alias "@/*"`;

    try {
      // Set environment variables to prevent interactive prompts
      const execOptions = {
        cwd: projectPath,
        timeout: 300000, // 5 minute timeout
        env: {
          ...process.env,
          CI: "true",
          FORCE_COLOR: "0",
        },
      };

      await execAsync(createNextCommand, execOptions);
    } catch (error) {
      if (error.signal === "SIGTERM" || error.code === "TIMEOUT") {
        spinner.fail(chalk.red("NextJS creation timed out."));
        console.log(chalk.yellow("\n⚠️  Troubleshooting suggestions:"));
        console.log(chalk.white("1. Check your internet connection"));
        console.log(chalk.white("2. Try running the command manually:"));
        console.log(chalk.gray(`   cd ${projectName}`));
        console.log(chalk.gray(`   ${createNextCommand}`));
        console.log(chalk.white("3. Clear npm cache: npm cache clean --force"));
        throw new Error("NextJS creation timed out");
      }
      throw error;
    }

    // Copy frontend template files to the created NextJS app
    spinner.text = "Adding custom frontend components...";
    const frontendSrcPath = path.join(frontendPath, "src");

    // Determine file extensions based on language choice
    const isTypeScript = languageChoice === "TypeScript";
    const ext = isTypeScript ? "ts" : "js";
    const componentExt = isTypeScript ? "tsx" : "jsx";

    // Copy API routes with correct extension
    const apiRouteSrc = path.join(
      frontendTemplateDir,
      "src",
      "app",
      "api",
      "backend",
      `route.${ext}`,
    );
    const apiRouteDest = path.join(frontendSrcPath, "app", "api", "backend");
    await fs.mkdir(apiRouteDest, { recursive: true });
    await fs.cp(apiRouteSrc, path.join(apiRouteDest, `route.${ext}`));

    // Copy components with correct extension
    const componentSrc = path.join(
      frontendTemplateDir,
      "src",
      "components",
      `BackendDemo.${componentExt}`,
    );
    const componentDestDir = path.join(frontendSrcPath, "components");
    await fs.mkdir(componentDestDir, { recursive: true });
    await fs.cp(
      componentSrc,
      path.join(componentDestDir, `BackendDemo.${componentExt}`),
    );

    // Copy lib utilities with correct extension
    const libSrc = path.join(frontendTemplateDir, "src", "lib", `api.${ext}`);
    const libDestDir = path.join(frontendSrcPath, "lib");
    await fs.mkdir(libDestDir, { recursive: true });
    await fs.cp(libSrc, path.join(libDestDir, `api.${ext}`));

    // Copy updated page with correct extension
    const pageSrc = path.join(
      frontendTemplateDir,
      "src",
      "app",
      `page.${componentExt}`,
    );
    await fs.cp(
      pageSrc,
      path.join(frontendSrcPath, "app", `page.${componentExt}`),
    );

    // Copy environment and README files
    spinner.text = "Adding configuration files...";
    await fs.cp(
      path.join(frontendTemplateDir, ".env.local.template"),
      path.join(frontendPath, ".env.local"),
    );

    await fs.cp(
      path.join(frontendTemplateDir, "README.md"),
      path.join(frontendPath, "README.md"),
    );

    // Copy project-level package.json for convenient scripts
    await fs.cp(
      path.join(mainTemplatePath, "project-package.json"),
      path.join(projectPath, "package.json"),
    );

    // Copy project README
    await fs.cp(
      path.join(mainTemplatePath, "project-README.md"),
      path.join(projectPath, "README.md"),
    );

    // Install concurrently in the project root
    spinner.text = "Installing project dependencies...";
    await execAsync(`npm pkg set name="${projectName}"`, { cwd: projectPath });
    await execAsync("npm install", { cwd: projectPath });

    spinner.succeed(chalk.green(`Project created successfully! 🚀`));

    // Display setup instructions
    console.log(chalk.cyan("\n📋 Quick Start:"));
    console.log(chalk.white("Run both frontend and backend together:"));
    console.log(chalk.green(`   cd ${projectName}`));
    console.log(chalk.green("   npm run dev"));

    console.log(chalk.cyan("\n📋 Manual Setup (if needed):"));
    console.log(chalk.white("1. Backend setup:"));
    console.log(chalk.gray(`   cd ${projectName}\\backend`));

    if (isWindows) {
      console.log(chalk.gray("   # Activate virtual environment (Windows)"));
      console.log(chalk.gray("   venv\\Scripts\\activate"));
    } else {
      console.log(
        chalk.gray("   # Activate virtual environment (macOS/Linux)"),
      );
      console.log(chalk.gray("   source venv/bin/activate"));
    }

    if (api === "RunAPI") {
      console.log(chalk.gray("   npm run dev  # or runapi dev"));
      console.log(chalk.gray("   npm start    # or runapi start (production)"));
    } else {
      console.log(chalk.gray("   npm run dev  # or uvicorn app:app --reload"));
    }

    console.log(chalk.white("\n2. Frontend setup:"));
    console.log(chalk.gray(`   cd ${projectName}\\frontend`));
    console.log(chalk.gray("   npm install"));
    console.log(chalk.gray("   npm run dev"));

    console.log(chalk.cyan("\n🚀 Available Scripts:"));
    console.log(
      chalk.white("   npm run dev          - Run both frontend & backend"),
    );
    console.log(chalk.white("   npm run frontend     - Run only frontend"));
    console.log(chalk.white("   npm run backend      - Run only backend"));
    console.log(
      chalk.white("   npm run build        - Build frontend for production"),
    );
    console.log(
      chalk.white("   npm run install:all  - Install all dependencies"),
    );

    console.log(chalk.cyan("\n🌐 URLs:"));
    console.log(chalk.white("   Backend:  http://localhost:8000"));
    console.log(chalk.white("   Frontend: http://localhost:3000"));

    console.log(chalk.green("\n✨ Features included:"));
    console.log(
      chalk.white("   • NextJS API routes that forward to Python backend"),
    );
    console.log(chalk.white("   • Sample GET/POST request implementations"));
    console.log(chalk.white("   • TypeScript support with proper typing"));
    console.log(chalk.white("   • Error handling and loading states"));
    console.log(chalk.white("   • Tailwind CSS styling"));
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    console.error(chalk.red("\n🚨 Troubleshooting:"));
    console.error(
      chalk.yellow("• Make sure Python is installed and available in PATH"),
    );
    console.error(chalk.yellow("• Make sure Node.js and npm are installed"));
    console.error(
      chalk.yellow("• Check internet connection for downloading dependencies"),
    );
    process.exit(1);
  }
}

program.action(async (options) => {
  const answers = await promptInputs(options);
  const projectName = options.project || answers.project || "my-app";
  const language = options.language || answers.language || "JavaScript";
  const useTailwind = options.tailwind || answers.tailwind || "Yes";
  const api = options.api || answers.api || "RunAPI";

  await createProjectStructure(projectName, language, useTailwind, api);
});

program.parse(process.argv);
