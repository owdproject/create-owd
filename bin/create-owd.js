import { spawnSync } from 'child_process';

spawnSync('npx', ['@owdproject/cli', 'create'], { stdio: 'inherit' });