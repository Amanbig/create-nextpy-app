#!/usr/bin/env node
import { program } from 'commander';
import figlet from 'figlet';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import npm from 'npm-programmatic';
import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Detect operating system
const isWindows = os.platform() === 'win32';

console.log(chalk.cyan(figlet.textSync('NextPython')));

program
    .name('nextpython')
    .description('CLI tool to generate nextjs frontend with python backend')
    .version('1.0.0')
    .option('-p, --project <name>', 'Specify project name')
    .option('-l, --language <type>', 'Specify language (JavaScript, TypeScript)')
    .option('-t, --tailwind <type>', 'Specify whether to use tailwind')
    .option('-f, --force', 'Force overwrite of existing files without prompting')

async function promptInputs(options) {
    const questions = [];

    if (!options.project) {
        questions.push({
            type: 'input',
            name: 'project',
            message: chalk.green('What is your project name?'),
            prefix: '📋',
            default: 'my-app',
            validate: (input) => (input.trim() ? true : 'Project name cannot be empty'),
        });
    }

    if (!options.language) {
        questions.push({
            type: 'list',
            name: 'language',
            message: chalk.green('Which language do you want to use?'),
            prefix: '💻',
            choices: ['JavaScript', 'TypeScript'],
        });
    }

    if (!options.tailwind) {
        questions.push({
            type: 'list',
            name: 'tailwind',
            message: chalk.green('Do you want to use Tailwind CSS?'),
            prefix: '🎨',
            choices: ['Yes', 'No'],
        });
    }

    return inquirer.prompt(questions);
}

async function createProjectStructure(projectName, languageChoice = 'JavaScript', useTailwind = false) {
  const backendTemplateDir = path.join(__dirname, 'backend_folder');
  const frontendTemplateDir = path.join(__dirname, 'frontend_folder');
  const projectPath = path.join(process.cwd(), projectName);
  const frontendPath = path.join(projectPath, 'frontend');
  const backendPath = path.join(projectPath, 'backend');
  const spinner = ora('Creating project structure...').start();

  await fs.mkdir(projectPath, { recursive: true });
  await fs.mkdir(frontendPath);
  await fs.mkdir(backendPath);

  try {
    // copy backend boilerplate files
    spinner.text = 'Setting up backend files...';
    const files = ["requirements.txt", "app.py", ".gitignore", ".env"];
    for (const file of files) {
      await fs.cp(path.join(backendTemplateDir, file), path.join(backendPath, file));
    }

    // backend setup with OS-specific commands
    spinner.text = 'Setting up Python virtual environment...';
    await execAsync(`python -m venv venv`, { cwd: backendPath });
    
    // Install requirements using OS-specific path
    spinner.text = 'Installing Python dependencies...';
    const pipPath = isWindows ? 'venv\\Scripts\\pip' : 'venv/bin/pip';
    await execAsync(`${pipPath} install -r requirements.txt`, { cwd: backendPath });

    // frontend setup
    spinner.text = 'Creating NextJS application (this may take a few minutes)...';
    const langFlag = languageChoice === "TypeScript" ? "--typescript" : "";
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
          CI: 'true',
          FORCE_COLOR: '0'
        }
      };
      
      await execAsync(createNextCommand, execOptions);
    } catch (error) {
      if (error.signal === 'SIGTERM' || error.code === 'TIMEOUT') {
        spinner.fail(chalk.red('NextJS creation timed out.'));
        console.log(chalk.yellow('\n⚠️  Troubleshooting suggestions:'));
        console.log(chalk.white('1. Check your internet connection'));
        console.log(chalk.white('2. Try running the command manually:'));
        console.log(chalk.gray(`   cd ${projectName}`));
        console.log(chalk.gray(`   ${createNextCommand}`));
        console.log(chalk.white('3. Clear npm cache: npm cache clean --force'));
        throw new Error('NextJS creation timed out');
      }
      throw error;
    }

    // Copy frontend template files to the created NextJS app
    spinner.text = 'Adding custom frontend components...';
    const frontendSrcPath = path.join(frontendPath, 'src');
    
    // Determine file extensions based on language choice
    const isTypeScript = languageChoice === 'TypeScript';
    const ext = isTypeScript ? 'ts' : 'js';
    const componentExt = isTypeScript ? 'tsx' : 'jsx';
    
    // Copy API routes with correct extension
    const apiRouteSrc = path.join(frontendTemplateDir, 'src', 'app', 'api', 'backend', `route.${ext}`);
    const apiRouteDest = path.join(frontendSrcPath, 'app', 'api', 'backend');
    await fs.mkdir(apiRouteDest, { recursive: true });
    await fs.cp(apiRouteSrc, path.join(apiRouteDest, `route.${ext}`));
    
    // Copy components with correct extension
    const componentSrc = path.join(frontendTemplateDir, 'src', 'components', `BackendDemo.${componentExt}`);
    const componentDestDir = path.join(frontendSrcPath, 'components');
    await fs.mkdir(componentDestDir, { recursive: true });
    await fs.cp(componentSrc, path.join(componentDestDir, `BackendDemo.${componentExt}`));
    
    // Copy lib utilities with correct extension
    const libSrc = path.join(frontendTemplateDir, 'src', 'lib', `api.${ext}`);
    const libDestDir = path.join(frontendSrcPath, 'lib');
    await fs.mkdir(libDestDir, { recursive: true });
    await fs.cp(libSrc, path.join(libDestDir, `api.${ext}`));
    
    // Copy updated page with correct extension
    const pageSrc = path.join(frontendTemplateDir, 'src', 'app', `page.${componentExt}`);
    await fs.cp(pageSrc, path.join(frontendSrcPath, 'app', `page.${componentExt}`));
    
    // Copy environment and README files
    spinner.text = 'Adding configuration files...';
    await fs.cp(
      path.join(frontendTemplateDir, '.env.local'),
      path.join(frontendPath, '.env.local')
    );
    
    await fs.cp(
      path.join(frontendTemplateDir, 'README.md'),
      path.join(frontendPath, 'README.md')
    );

    spinner.succeed(chalk.green(`Project created successfully! 🚀`));
    
    // Display setup instructions
    console.log(chalk.cyan('\n📋 Setup Instructions:'));
    console.log(chalk.white('1. Backend setup:'));
    console.log(chalk.gray(`   cd ${projectName}\\backend`));
    
    if (isWindows) {
      console.log(chalk.gray('   # Activate virtual environment (Windows)'));
      console.log(chalk.gray('   venv\\Scripts\\activate'));
    } else {
      console.log(chalk.gray('   # Activate virtual environment (macOS/Linux)'));
      console.log(chalk.gray('   source venv/bin/activate'));
    }
    
    console.log(chalk.gray('   uvicorn app:app --reload'));
    
    console.log(chalk.white('\n2. Frontend setup:'));
    console.log(chalk.gray(`   cd ${projectName}\\frontend`));
    console.log(chalk.gray('   npm install'));
    console.log(chalk.gray('   npm run dev'));
    
    console.log(chalk.cyan('\n🌐 URLs:'));
    console.log(chalk.white('   Backend:  http://localhost:8000'));
    console.log(chalk.white('   Frontend: http://localhost:3000'));
    
    console.log(chalk.green('\n✨ Features included:'));
    console.log(chalk.white('   • NextJS API routes that forward to Python backend'));
    console.log(chalk.white('   • Sample GET/POST request implementations'));
    console.log(chalk.white('   • TypeScript support with proper typing'));
    console.log(chalk.white('   • Error handling and loading states'));
    console.log(chalk.white('   • Tailwind CSS styling'));
    
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    console.error(chalk.red('\n🚨 Troubleshooting:'));
    console.error(chalk.yellow('• Make sure Python is installed and available in PATH'));
    console.error(chalk.yellow('• Make sure Node.js and npm are installed'));
    console.error(chalk.yellow('• Check internet connection for downloading dependencies'));
    process.exit(1);
  }
}


program.action(async (options) => {
    const answers = await promptInputs(options);
    const projectName = options.project || answers.project || 'my-app';
    const language = options.language || answers.language || 'JavaScript';
    const useTailwind = options.tailwind || answers.tailwind || 'Yes';

    await createProjectStructure(projectName, language, useTailwind);
});

program.parse(process.argv);