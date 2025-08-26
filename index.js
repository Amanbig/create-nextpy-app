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

    
}