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
  await fs.mkdir(backendPath);

  try {
    // copy backend boilerplate files
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
    spinner.text = 'Creating NextJS application...';
    const langFlag = languageChoice === "TypeScript" ? "--typescript" : "";
    const twFlag = useTailwind === "Yes" ? "--tailwind" : "";
    await execAsync(
      `npx create-next-app@latest frontend ${langFlag} ${twFlag} --eslint --app --src-dir --import-alias "@/*"`,
      { cwd: projectPath }
    );

    // Copy frontend template files to the created NextJS app
    spinner.text = 'Adding custom frontend components...';
    const frontendSrcPath = path.join(frontendPath, 'src');
    
    // Copy API routes
    await fs.cp(
      path.join(frontendTemplateDir, 'src', 'app', 'api'),
      path.join(frontendSrcPath, 'app', 'api'),
      { recursive: true }
    );
    
    // Copy components
    await fs.cp(
      path.join(frontendTemplateDir, 'src', 'components'),
      path.join(frontendSrcPath, 'components'),
      { recursive: true }
    );
    
    // Copy lib utilities
    await fs.cp(
      path.join(frontendTemplateDir, 'src', 'lib'),
      path.join(frontendSrcPath, 'lib'),
      { recursive: true }
    );
    
    // Copy updated page.tsx
    await fs.cp(
      path.join(frontendTemplateDir, 'src', 'app', 'page.tsx'),
      path.join(frontendSrcPath, 'app', 'page.tsx')
    );
    
    // Copy environment and README files
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