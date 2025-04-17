#!/usr/bin/env node

import { execSync } from 'child_process';

try {
    execSync('npx @owdproject/cli create', { stdio: 'inherit' });
} catch (error) {
    console.error('✖ Error occurred during project creation:', error);
    process.exit(1);
}