# Reusable workflows

This repository exposes Knip and Jest as reusable workflows so repositories that inherited from the template can consume one centrally maintained implementation.

## Knip

```yaml
name: Knip

on:
  pull_request:
  workflow_dispatch:

jobs:
  run-knip:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable-knip.yml@main
    with:
      package-manager: bun
      install-command: bun install
      knip-command: bun run knip
      knip-json-command: bun run knip --reporter json
```

For Yarn repositories:

```yaml
jobs:
  run-knip:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable-knip.yml@main
    with:
      package-manager: yarn
      node-version: 24
      yarn-version: "4.9.2"
      install-command: yarn install --immutable
      knip-command: yarn knip
      knip-json-command: yarn knip --reporter json
```

## Jest

```yaml
name: Run Jest testing suite

on:
  pull_request:
  workflow_dispatch:

jobs:
  testing:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable-jest-testing.yml@main
    with:
      package-manager: bun
      install-command: bun install --frozen-lockfile
      test-command: bun run test
```

For Yarn repositories:

```yaml
jobs:
  testing:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable-jest-testing.yml@main
    with:
      package-manager: yarn
      node-version: 24
      yarn-version: "4.9.2"
      install-command: yarn install --immutable
      test-command: yarn test
```

## Inputs

Both reusable workflows support:

- `package-manager`: `bun`, `yarn`, `npm`, or `pnpm`.
- `bun-version`: Bun version when using Bun.
- `node-version`: Node.js version when using Yarn, npm, or pnpm.
- `yarn-version`: optional Corepack Yarn version for repositories pinned to different Yarn releases.
- command overrides for install/test/Knip execution.

The wrapper workflows in this template continue to run on `pull_request` and `workflow_dispatch`, but delegate implementation to the reusable workflows.
