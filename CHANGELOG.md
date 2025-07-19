# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-07-18

### Fixed
- Removed problematic self-dependency that was causing npm installation failures
- Fixed "ENOENT: no such file or directory" error when running `npx @pimzino/claude-code-spec-workflow`
- Eliminated circular dependency on `pimzino-claude-code-spec-workflow-1.0.1.tgz` file

### Technical Details
- Removed erroneous self-reference from package.json dependencies
- Removed leftover tarball file from project root directory
- Added `*.tgz` to .gitignore to prevent future tarball commits
- Package now installs cleanly without looking for non-existent tarball files
- Resolves npm cache corruption warnings during installation

## [1.0.2] - 2025-07-18

### Fixed
- Improved current CLAUDE.md handling to avoid overwriting existing content

## [1.0.1] - 2025-07-18

### Fixed
- Fixed NPX execution issue by adding package name as binary entry
- NPX command `npx @pimzino/claude-code-spec-workflow` now works correctly
- Added `claude-code-spec-workflow` binary alongside existing `claude-spec-setup`

### Technical Details
- Updated package.json bin configuration to include both binary names
- Ensures compatibility with NPX's expected binary naming convention

## [1.0.0] - 2025-07-18

### Added
- Initial release of Claude Code Spec Workflow
- Automated spec-driven workflow for Claude Code
- Complete Requirements → Design → Tasks → Implementation process
- 7 slash commands for workflow automation:
  - `/spec-create` - Create new feature specifications
  - `/spec-requirements` - Generate requirements documents
  - `/spec-design` - Create technical design documents
  - `/spec-tasks` - Generate implementation task lists
  - `/spec-execute` - Execute specific tasks
  - `/spec-status` - Show workflow status
  - `/spec-list` - List all specifications
- Interactive CLI setup with progress indicators
- Project type auto-detection (Node.js, Python, Java, etc.)
- Claude Code installation validation
- Comprehensive document templates
- EARS format requirements generation
- Mermaid diagram support in design documents
- Test-driven development focus
- Requirement traceability throughout workflow
- Professional TypeScript implementation
- Complete test suite with 17 tests
- Zero-configuration setup
- Smart file management (preserves existing CLAUDE.md)
- Cross-platform support (Windows, macOS, Linux)

### Features
- **Zero Configuration**: Works out of the box with any project
- **Interactive Setup**: Beautiful CLI with ora spinners and inquirer prompts
- **Smart File Management**: Preserves existing content while adding workflow
- **Professional Quality**: TypeScript, comprehensive error handling, npm best practices
- **Comprehensive Documentation**: Auto-generated CLAUDE.md with complete workflow instructions

### Technical Details
- Node.js 16.0.0+ requirement
- TypeScript implementation targeting ES2020
- Jest testing framework with ts-jest
- ESLint and Prettier for code quality
- Commander.js for CLI framework
- Inquirer for interactive prompts
- Ora for elegant terminal spinners
- Chalk for terminal styling

### Package Structure
```
.claude/
├── commands/           # 7 slash commands for spec workflow
├── templates/          # Document templates
├── specs/             # Generated spec files
└── spec-config.json   # Configuration
```

### Installation Options
- NPX (recommended): `npx @pimzino/claude-code-spec-workflow`
- Global: `npm install -g @pimzino/claude-code-spec-workflow`
- Local: `npm install --save-dev @pimzino/claude-code-spec-workflow`

### Documentation
- Comprehensive README with examples
- Built-in test command
- Troubleshooting guide
- CI/CD integration examples
- Professional MIT license
