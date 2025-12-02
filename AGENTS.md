# Project: Release Please

## Project Overview

This project, `release-please`, is a Node.js application written in TypeScript that automates the process of creating release pull requests, generating changelogs, and publishing releases on GitHub. It uses the [Conventional Commits](https://www.conventionalcommits.org/) specification to determine version bumps and generate release notes.

The project provides both a command-line interface (CLI) and a library for programmatic use.

### Key Technologies

*   **Language:** TypeScript
*   **Platform:** Node.js
*   **Package Manager:** npm
*   **Testing:** Mocha, Chai, Sinon, c8 (for coverage)
*   **Linting:** gts (Google TypeScript Style)
*   **Key Dependencies:**
    *   `yargs`: For parsing command-line arguments.
    *   `@octokit/rest`: For interacting with the GitHub API.
    *   `conventional-commits-parser`: For parsing conventional commit messages.

### Architecture

The project is structured as follows:

*   `src/`: Contains the TypeScript source code.
    *   `bin/`: Contains the CLI entry point.
    *   `strategies/`: Contains the logic for different release strategies (e.g., Node.js, Java, Python).
    *   `updaters/`: Contains logic for updating version files (e.g., `package.json`, `pom.xml`).
*   `test/`: Contains the tests for the project.
*   `templates/`: Contains templates for changelogs and release notes.

The core logic is built around the concept of "strategies," where each strategy knows how to handle a specific type of project (e.g., a Node.js module, a Java project). The strategies use "updaters" to modify the appropriate version files.

## Building and Running

### Installation

```bash
npm install
```

### Compilation

```bash
npm run compile
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Running the CLI

The CLI can be run directly using `node` or via `npm link`.

```bash
# After running npm install and npm run compile
node build/src/bin/release-please.js --help
```

## Development Conventions

*   **Conventional Commits:** All commits should follow the Conventional Commits specification.
*   **Coding Style:** The project uses the Google TypeScript Style, enforced by the `gts` linter.
*   **Testing:** All new features and bug fixes should be accompanied by tests. The project uses Mocha for tests, Chai for assertions, and Sinon for mocking.
*   **Branching:** The `main` branch is the primary development branch.
*   **Releases:** The release process is automated using `release-please` itself.
