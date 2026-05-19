# create-owd

Scaffolds a new **[Nuxt Desktop](https://owdproject.org)** project (Open Web Desktop / `@owdproject/core`).

## Usage

```bash
npm create owd
# or
npm create owd my-desktop
```

Equivalent after installing `@owdproject/core`:

```bash
desktop init my-desktop
```

## What happens

1. Copies the official template (from `owdproject/client` or a local `template/` in dev)
2. Runs `pnpm install`
3. Opens **`desktop ui`** automatically in interactive terminals (skipped in CI)

## After setup

```bash
cd my-desktop
pnpm desktop ui    # control panel (apps, themes, modules)
pnpm run dev       # Nuxt dev server only
```

Install mode defaults to **User (npm)** — see `.owd/settings.json` in your project.

## Add apps, modules, and themes

```bash
pnpm desktop add @owdproject/app-todo
pnpm desktop add @owdproject/module-fs
pnpm desktop add @owdproject/theme-win95
```

## Development

From the OWD client monorepo, sync the shared scaffold before publishing:

```bash
node create-owd/scripts/vendor-scaffold.js
```

`prepack` runs this automatically when publishing `create-owd` to npm.
