#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const src = join(root, '../packages/core/bin/lib/scaffold.js')
const destDir = join(root, 'src/lib')
const dest = join(destDir, 'scaffold.js')

if (!existsSync(src)) {
  console.error('Source scaffold not found:', src)
  console.error('Run this script from the OWD client monorepo, or commit src/lib/scaffold.js')
  process.exit(1)
}

mkdirSync(destDir, { recursive: true })
copyFileSync(src, dest)
console.log('Vendored scaffold.js →', dest)
