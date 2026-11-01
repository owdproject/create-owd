#!/usr/bin/env node

import { runCli } from '@owdproject/cli/bin/cli.js'

const args = process.argv.slice(2)
if (args.length === 0 || args[0] === 'help' || args.includes('--help')) {
  await runCli('desktop', args)
} else {
  await runCli('desktop', ['init', ...(args[0].startsWith('-') ? ['.'] : []), ...args])
}
