# ci(workflows): make Knip and Jest workflows reusable (#13)

## Summary
Resolves #13 by converting the `knip.yml` and `jest-testing.yml` workflows into reusable GitHub Actions workflows (`workflow_call`) supporting parameterized package managers (`bun` vs `yarn`) and versions.

### Changes
- Added `workflow_call` triggers to `.github/workflows/knip.yml` with inputs for `package-manager`, `bun-version`, and `node-version`.
- Added `workflow_call` triggers to `.github/workflows/jest-testing.yml` with conditional toolchain setup for both Bun and Yarn.
- Preserved direct `pull_request` and `workflow_dispatch` execution.

Closes #13
