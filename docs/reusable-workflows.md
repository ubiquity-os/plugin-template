# Reusable Workflows

This repository provides reusable GitHub Actions workflows for Knip (unused code detection) and Jest (testing) that can be called from any repository in the `ubiquity-os` organization (or beyond).

## Available Workflows

### Knip — `.github/workflows/knip.yml`

Runs [Knip](https://github.com/webpro/knip) to detect unused files, dependencies, exports, and more.

**Inputs:**

| Input | Description | Default | Required |
|-------|-------------|---------|----------|
| `node-version` | Node.js version | `20` | No |
| `package-manager` | Package manager: `bun`, `yarn`, or `npm` | `bun` | No |
| `working-directory` | Working directory for commands | `.` | No |

### Jest — `.github/workflows/jest-testing.yml`

Runs the Jest test suite with coverage reporting.

**Inputs:**

| Input | Description | Default | Required |
|-------|-------------|---------|----------|
| `node-version` | Node.js version | `20` | No |
| `package-manager` | Package manager: `bun`, `yarn`, or `npm` | `bun` | No |
| `working-directory` | Working directory for commands | `.` | No |
| `test-command` | Custom test command (overrides default) | `""` | No |

## Usage

### Minimal (defaults)

```yaml
name: CI

on:
  pull_request:

jobs:
  knip:
    uses: ubiquity-os/plugin-template/.github/workflows/knip.yml@main

  test:
    uses: ubiquity-os/plugin-template/.github/workflows/jest-testing.yml@main
```

### With custom package manager

```yaml
jobs:
  knip:
    uses: ubiquity-os/plugin-template/.github/workflows/knip.yml@main
    with:
      package-manager: yarn

  test:
    uses: ubiquity-os/plugin-template/.github/workflows/jest-testing.yml@main
    with:
      package-manager: npm
```

### With custom test command and working directory

```yaml
jobs:
  test:
    uses: ubiquity-os/plugin-template/.github/workflows/jest-testing.yml@main
    with:
      package-manager: bun
      working-directory: ./packages/my-package
      test-command: "bun run test:ci"
```

### Full configuration

```yaml
jobs:
  knip:
    uses: ubiquity-os/plugin-template/.github/workflows/knip.yml@main
    with:
      node-version: "22"
      package-manager: yarn
      working-directory: ./src

  test:
    uses: ubiquity-os/plugin-template/.github/workflows/jest-testing.yml@main
    with:
      node-version: "22"
      package-manager: yarn
      working-directory: ./src
      test-command: "yarn test:coverage"
```

## Notes

- The workflows still work standalone (direct triggers via `pull_request` and `workflow_dispatch`) as well as via `workflow_call`.
- The Knip reporter workflow (`knip-reporter.yml`) remains unchanged and will continue to post comments on PRs when Knip detects issues.
- Pin to a specific ref (tag or commit SHA) instead of `main` for production stability.
