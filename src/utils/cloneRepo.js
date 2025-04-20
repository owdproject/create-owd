import chalk from "chalk";
import fs from 'fs-extra';
import path from 'path';
import simpleGit from 'simple-git';
import ora from 'ora';

export const cloneRepo = async (targetPath) => {
    const git = simpleGit();
    const tempDir = path.join(process.cwd(), 'owd-temp');
    const spinner = ora();

    try {
        // Clean tempDir if it exists already
        if (fs.existsSync(tempDir)) {
            await fs.remove(tempDir);
        }

        // Start spinner for cloning
        spinner.start('Cloning template repository...');
        await git.clone('https://github.com/owdproject/client', tempDir);

        const templatePath = path.join(tempDir, 'template');

        // Check if the template exists, then copy
        if (fs.existsSync(templatePath)) {
            spinner.text = 'Copying template files...';
            spinner.start();

            fs.copySync(templatePath, targetPath);

            spinner.succeed('Template copied successfully');
        } else {
            spinner.fail(chalk.red('Template directory does not exist in the cloned repo'));
            process.exit(1);
        }
    } catch (error) {
        spinner.fail(chalk.red('Error cloning or copying the template'));
        console.error(error);
        process.exit(1);
    } finally {
        // Clean up temp directory after process
        if (fs.existsSync(tempDir)) {
            await fs.remove(tempDir);
        }
    }
};
