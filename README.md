<p align="center">
  <img width="160" height="160" src="https://avatars.githubusercontent.com/u/65117737?s=160&v=4" />
</p>
<h1 align="center">create-owd</h1>
<h3 align="center">
  Scaffold a new Open Web Desktop project.
</h3>

---

`create-owd` is the installer CLI tool for **[Open Web Desktop](https://owdproject.org)**, a modular framework for building web-based desktop experiences and digital gardens.

## Usage

```bash
# Start interactively and choose your preferred setup type
npm create owd
# or specify the target folder directly
npm create owd my-desktop
```

You can also pass arguments to skip prompts and configure the setup directly:

```bash
# Recommended: clone the entire owdproject/client workspace repository
npm create owd my-desktop --clone

# Start from the standard template only
npm create owd my-desktop --template
```

## What happens

1. Clones the entire `owdproject/client` repository from GitHub (recommended), or copies the official template starter structure.
2. Runs `pnpm install` to setup all dependencies.
3. Automatically opens the interactive control panel UI (`desktop`).

## After setup

```bash
cd my-desktop
pnpm desktop    # Open the control panel (TUI) to manage packages and dev server
pnpm run dev    # Or start the Nuxt dev server directly
```

## Add apps, modules, and themes

Use the OWD CLI commands inside your project to easily install, import, and configure modules:

```bash
pnpm desktop add app-todo
pnpm desktop add module-fs
pnpm desktop add theme-nova
```

## Development

From the OWD client monorepo, sync the shared scaffold before publishing:

```bash
node create-owd/scripts/vendor-scaffold.js
```

`prepack` runs this automatically when publishing `create-owd` to npm.
