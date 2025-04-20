#!/usr/bin/env node

import chalk from "chalk";
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { cloneRepo } from '../src/utils/cloneRepo.js';
import ora from 'ora';

const init = async () => {
    let projectDir = (process.argv[2] || '').trim();

    if (!projectDir) {
        console.log('')
        // Ask for project directory name if not provided as an argument
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'dir',
                message: 'Enter the directory name for your new project:',
                default: 'owd-client',
            },
        ]);
        projectDir = answers.dir.trim();
    }

    const targetDir = path.join(process.cwd(), projectDir);

    if (fs.existsSync(targetDir)) {
        ora({
            text: `Directory "${projectDir}" already exists`,
            spinner: 'dots',
        }).fail();
        console.log('')
        process.exit(1);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    console.log('')

    const spinner = ora({
        text: 'Cloning base project...',
        spinner: 'dots',
    }).start();

    try {
        // Clone the base project repo
        await cloneRepo(targetDir);

        spinner.succeed('Ready to start your project');

        console.log(chalk.white('\nNext steps:\n'));
        console.log(`${chalk.gray('$')} ${chalk.cyan(`cd ${projectDir}`)}`);
        console.log('');
        console.log(`${chalk.gray('$')} ${chalk.cyan('npm install')}`);
        console.log(`${chalk.gray('$')} ${chalk.cyan('npm run dev')}\n`);
    } catch (err) {
        // If there's an error, fail the spinner and exit
        spinner.fail('Error during project setup');
        console.error('Error during project setup:', err);
        process.exit(1);
    }
};

init();
