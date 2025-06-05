# @vylo-app/shared-contract

Shared TypeScript types and schemas for backend and frontend.

## Usage

```ts
import { User } from '@vylo-app/shared-contract';
```

## Publish

```sh
make shared_contract_publish
```

This will:

- Build the package
- Bump the version (patch)
- Publish to GitHub Packages

## Pull latest in frontend

```sh
make pull_types_from_npm
```

## First-time setup

```sh
npm login --registry=https://npm.pkg.github.com
# Use GitHub username, PAT as password
```
