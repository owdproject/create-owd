#!/usr/bin/env node

import inquirer from 'inquirer'
import { scaffoldProject } from '../src/lib/scaffold.js'

const init = async () => {
  let projectDir = (process.argv[2] || '').trim()

  if (!projectDir) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'dir',
        message: 'Enter the directory name for your new project:',
        default: 'client',
      },
    ])
    projectDir = answers.dir.trim()
  }

  try {
    await scaffoldProject({ dir: projectDir, cwd: process.cwd(), commandName: 'desktop' })
  } catch (err) {
    console.error('\n✗ Error during project setup:', err.message ?? err)
    process.exit(1)
  }
}

init()
