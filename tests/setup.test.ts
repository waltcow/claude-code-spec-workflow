import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { SpecWorkflowSetup } from '../src/setup';

describe('SpecWorkflowSetup', () => {
  let tempDir: string;
  let setup: SpecWorkflowSetup;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(join(tmpdir(), 'claude-spec-test-'));
    setup = new SpecWorkflowSetup(tempDir);
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test('should create directory structure', async () => {
    await setup.setupDirectories();

    const claudeDir = join(tempDir, '.claude');
    const commandsDir = join(claudeDir, 'commands');
    const specsDir = join(claudeDir, 'specs');
    const templatesDir = join(claudeDir, 'templates');
    const scriptsDir = join(claudeDir, 'scripts');

    await expect(fs.access(claudeDir)).resolves.not.toThrow();
    await expect(fs.access(commandsDir)).resolves.not.toThrow();
    await expect(fs.access(specsDir)).resolves.not.toThrow();
    await expect(fs.access(templatesDir)).resolves.not.toThrow();
    await expect(fs.access(scriptsDir)).resolves.not.toThrow();
  });

  test('should detect existing claude directory', async () => {
    expect(await setup.claudeDirectoryExists()).toBe(false);

    await setup.setupDirectories();

    expect(await setup.claudeDirectoryExists()).toBe(true);
  });

  test('should create slash commands', async () => {
    await setup.setupDirectories();
    await setup.createSlashCommands();

    const commandsDir = join(tempDir, '.claude', 'commands');
    const expectedCommands = [
      'spec-create.md',
      'spec-requirements.md',
      'spec-design.md',
      'spec-tasks.md',
      'spec-execute.md',
      'spec-status.md',
      'spec-list.md'
    ];

    for (const command of expectedCommands) {
      const commandPath = join(commandsDir, command);
      await expect(fs.access(commandPath)).resolves.not.toThrow();

      const content = await fs.readFile(commandPath, 'utf-8');
      expect(content.length).toBeGreaterThan(0);
      expect(content).toContain('# Spec');
    }
  });

  test('should create templates', async () => {
    await setup.setupDirectories();
    await setup.createTemplates();

    const templatesDir = join(tempDir, '.claude', 'templates');
    const expectedTemplates = [
      'requirements-template.md',
      'design-template.md',
      'tasks-template.md'
    ];

    for (const template of expectedTemplates) {
      const templatePath = join(templatesDir, template);
      await expect(fs.access(templatePath)).resolves.not.toThrow();

      const content = await fs.readFile(templatePath, 'utf-8');
      expect(content.length).toBeGreaterThan(0);
    }
  });

  test('should create scripts', async () => {
    await setup.setupDirectories();
    await setup.createScripts();

    const scriptsDir = join(tempDir, '.claude', 'scripts');
    const expectedScripts = [
      'generate-commands.bat',
      'generate-commands.sh',
      'generate-commands-launcher.sh',
      'README.md'
    ];

    for (const script of expectedScripts) {
      const scriptPath = join(scriptsDir, script);
      await expect(fs.access(scriptPath)).resolves.not.toThrow();

      const content = await fs.readFile(scriptPath, 'utf-8');
      expect(content.length).toBeGreaterThan(0);

      // Check for appropriate content based on script type
      if (script === 'generate-commands.bat') {
        expect(content).toContain('@echo off');
        expect(content).toContain('Command Generation Script for Claude Code Spec Workflow (Windows)');
      } else if (script === 'generate-commands.sh') {
        expect(content).toContain('#!/bin/bash');
        expect(content).toContain('Command Generation Script for Claude Code Spec Workflow (Unix/Linux/macOS)');
      } else if (script === 'generate-commands-launcher.sh') {
        expect(content).toContain('#!/bin/bash');
        expect(content).toContain('OS Detection and Command Generation Launcher');
      } else if (script === 'README.md') {
        expect(content).toContain('Command Generation Instructions');
        expect(content).toContain('Platform-Specific Script Execution');
      }
    }
  });

  test('should create config file', async () => {
    await setup.setupDirectories();
    await setup.createConfigFile();

    const configPath = join(tempDir, '.claude', 'spec-config.json');
    await expect(fs.access(configPath)).resolves.not.toThrow();

    const content = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(content);

    expect(config).toHaveProperty('spec_workflow');
    expect(config.spec_workflow).toHaveProperty('version');
    expect(config.spec_workflow).toHaveProperty('auto_create_directories');
  });

  test('should create CLAUDE.md', async () => {
    await setup.setupDirectories();
    await setup.createClaudeMd();

    const claudeMdPath = join(tempDir, 'CLAUDE.md');
    await expect(fs.access(claudeMdPath)).resolves.not.toThrow();

    const content = await fs.readFile(claudeMdPath, 'utf-8');
    expect(content).toContain('# Spec Workflow');
    expect(content).toContain('/spec-create');
    expect(content).toContain('Requirements → Design → Tasks → Implementation');
  });

  test('should run complete setup', async () => {
    await setup.runSetup();

    // Check that all components were created
    const claudeDir = join(tempDir, '.claude');
    const commandsDir = join(claudeDir, 'commands');
    const templatesDir = join(claudeDir, 'templates');
    const configPath = join(claudeDir, 'spec-config.json');
    const claudeMdPath = join(tempDir, 'CLAUDE.md');

    await expect(fs.access(claudeDir)).resolves.not.toThrow();
    await expect(fs.access(commandsDir)).resolves.not.toThrow();
    await expect(fs.access(templatesDir)).resolves.not.toThrow();
    await expect(fs.access(configPath)).resolves.not.toThrow();
    await expect(fs.access(claudeMdPath)).resolves.not.toThrow();

    // Check that files have content
    const claudeMdContent = await fs.readFile(claudeMdPath, 'utf-8');
    expect(claudeMdContent.length).toBeGreaterThan(1000);
  });

  test('should handle existing CLAUDE.md', async () => {
    // Create existing CLAUDE.md with content
    const existingContent = '# My Project\n\nThis is my existing project documentation.\n';
    await fs.writeFile(join(tempDir, 'CLAUDE.md'), existingContent);

    await setup.setupDirectories();
    await setup.createClaudeMd();

    const claudeMdContent = await fs.readFile(join(tempDir, 'CLAUDE.md'), 'utf-8');
    expect(claudeMdContent).toContain('# My Project');
    expect(claudeMdContent).toContain('# Spec Workflow');
    expect(claudeMdContent).toContain('existing project documentation');
  });
});