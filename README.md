# create-owd

`create-owd` starts the Open Web Desktop control panel and project initializer.
Run it in an empty directory to choose a starter and create the project there:

```sh
mkdir my-desktop && cd my-desktop
npm create owd
```

The terminal interface shows the current path and whether it is empty before
creating anything. Inside an existing OWD workspace it opens the control panel.
A nonempty directory is protected from initialization. An explicit new target
is also supported:

```sh
npm create owd my-desktop
npm create owd my-desktop -- --framework nuxt
```

Nuxt is the supported control panel host. React can be selected but its host and
control panel are not yet verified; Vue, Svelte, Angular and Astro are planned.
After creating a Nuxt project, the initializer installs dependencies with pnpm
and opens the control panel. Node.js, pnpm, Git and Go are required for the
interactive Go interface. `--skip-install --skip-ui` creates the files without
installing dependencies or opening the panel.

The initializer delegates to `@owdproject/cli`; starter logic belongs there.
Local changes are not available through public `npm create owd` until both
packages are released. Never publish snapshots to public npm.
