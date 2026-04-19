# Reusable Workflows

This directory contains reusable GitHub workflows that can be used across multiple repositories in the UbiquityOS ecosystem.

## Available Workflows

### Knip Workflow

**File:** `reusable/knip.yml`

Reusable Knip workflow with configurable package manager support.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `package_manager` | string | `bun` | Package manager to use (bun, yarn, npm, pnpm) |
| `yarn_version` | string | `latest` | Yarn version (only used if package_manager is yarn) |
| `node_version` | string | `latest` | Node.js version |
| `working_directory` | string | `.` | Working directory for the workflow |
| `knip_script` | string | `knip` | Knip script name to run |
| `enable_reporter` | boolean | `true` | Enable Knip reporter for PR comments |

#### Usage Example

```yaml
name: Knip Check

on:
  pull_request:
  workflow_dispatch:

jobs:
  knip:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable/knip.yml@main
    with:
      package_manager: bun
      enable_reporter: true
```

#### Usage with Yarn

```yaml
name: Knip Check

on:
  pull_request:

jobs:
  knip:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable/knip.yml@main
    with:
      package_manager: yarn
      yarn_version: '3.6.0'
      enable_reporter: true
```

---

### Jest Testing Workflow

**File:** `reusable/jest.yml`

Reusable Jest testing workflow with configurable package manager and coverage support.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `package_manager` | string | `bun` | Package manager to use (bun, yarn, npm, pnpm) |
| `yarn_version` | string | `latest` | Yarn version (only used if package_manager is yarn) |
| `node_version` | string | `latest` | Node.js version |
| `working_directory` | string | `.` | Working directory for the workflow |
| `test_script` | string | `test` | Test script name to run |
| `coverage` | boolean | `false` | Enable code coverage |
| `coverage_script` | string | `test:coverage` | Coverage script name (if different from test script) |
| `enable_summary` | boolean | `true` | Enable Jest summary in GitHub Actions summary |

#### Usage Example

```yaml
name: Test Suite

on:
  pull_request:
  workflow_dispatch:

jobs:
  test:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable/jest.yml@main
    with:
      package_manager: bun
      enable_summary: true
```

#### Usage with Coverage

```yaml
name: Test Suite with Coverage

on:
  pull_request:

jobs:
  test:
    uses: ubiquity-os/plugin-template/.github/workflows/reusable/jest.yml@main
    with:
      package_manager: yarn
      yarn_version: '3.6.0'
      coverage: true
      coverage_script: 'test:coverage'
      enable_summary: true
```

---

## Benefits

1. **Centralized Maintenance**: Update workflows in one place, propagate to all repositories
2. **Consistency**: Ensure all repositories use the same testing and linting standards
3. **Flexibility**: Configure package manager, versions, and scripts per repository
4. **Reduced Duplication**: No need to maintain identical workflow files across repos

## Migration Guide

To migrate an existing repository to use these reusable workflows:

1. Remove existing `knip.yml`, `knip-reporter.yml`, and `jest-testing.yml` files
2. Create new workflow files that call the reusable workflows (see examples above)
3. Test the workflows on a pull request
4. Commit and push changes

## Permissions

Both workflows require the following permissions:

```yaml
permissions:
  contents: read
  pull-requests: write
  actions: read
```

The Knip workflow additionally needs `actions: read` permission to download artifacts from the workflow run.
