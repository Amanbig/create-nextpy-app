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

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

    // backend setup
    await execAsync(`python3 -m venv venv`, { cwd: backendPath });
    await execAsync(`venv/bin/pip install -r requirements.txt`, { cwd: backendPath });

    // frontend setup
    const langFlag = languageChoice === "TypeScript" ? "--typescript" : "";
    const twFlag = useTailwind === "Yes" ? "--tailwind" : "";
    await execAsync(
      `npx create-next-app@latest frontend ${langFlag} ${twFlag} --eslint --app --src-dir --import-alias "@/*"`,
      { cwd: projectPath, stdio: "inherit" }
    );

    // Copy frontend template files to the created NextJS app
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

    spinner.succeed(chalk.green(`Project created successfully! 🚀`));
    
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
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