#!/usr/bin/env node

import inquirer from 'inquirer'
import { scaffoldProject } from '../src/lib/scaffold.js'

const init = async () => {
  const args = process.argv.slice(2)
  let projectDir = ''
  let setupType = ''
  let skipInstall = false
  let skipUi = false

  for (const arg of args) {
    if (arg === '--template') {
      setupType = 'template'
    } else if (arg === '--clone') {
      setupType = 'clone'
    } else if (arg === '--skip-install') {
      skipInstall = true
    } else if (arg === '--skip-ui') {
      skipUi = true
    } else if (!arg.startsWith('-')) {
      projectDir = arg.trim()
    }
  }

  const isInteractive = Boolean(process.stdout.isTTY) && !process.env.CI

  const questions = []
  if (!projectDir && isInteractive) {
    questions.push({
      type: 'input',
      name: 'dir',
      message: 'Enter the directory name for your new project:',
      default: 'client',
    })
  }

  if (!setupType && isInteractive) {
    questions.push({
      type: 'list',
      name: 'setupType',
      message: 'Choose how to initialize the project:',
      choices: [
        new inquirer.Separator(' '),
        { name: 'Clone owdproject/client repository from GitHub (recommended)', value: 'clone' },
        { name: 'Start from template (standard Open Web Desktop template)', value: 'template' },
      ],
    })
  }

  if (questions.length > 0) {
    const answers = await inquirer.prompt(questions)
    if (answers.dir) {
      projectDir = answers.dir.trim()
    }
    if (answers.setupType) {
      setupType = answers.setupType
    }
  }

  if (!projectDir) {
    projectDir = 'client'
  }
  if (!setupType) {
    setupType = 'clone'
  }

  try {
    await scaffoldProject({
      dir: projectDir,
      cwd: process.cwd(),
      commandName: 'desktop',
      setupType,
      skipInstall,
      skipUi,
    })
  } catch (err) {
    console.error('\n✗ Error during project setup:', err.message ?? err)
    process.exit(1)
  }
}

init()
