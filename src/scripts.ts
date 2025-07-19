export function getCommandGenerationScript(): string {
  return `#!/usr/bin/env node

/**
 * Command Generation Script for Claude Code Spec Workflow
 *
 * This script generates individual task commands for each task in a spec's tasks.md file.
 * It creates a folder structure under .claude/commands/{spec-name}/ with individual
 * command files for each task that call /spec-execute with the appropriate parameters.
 *
 * Usage: node generate-commands.js <spec-name>
 */

const fs = require('fs').promises;
const path = require('path');

async function generateTaskCommands(specName) {
  if (!specName) {
    console.error('Error: Spec name is required');
    console.log('Usage: node generate-commands.js <spec-name>');
    process.exit(1);
  }

  const projectRoot = process.cwd();
  const specDir = path.join(projectRoot, '.claude', 'specs', specName);
  const tasksFile = path.join(specDir, 'tasks.md');
  const commandsSpecDir = path.join(projectRoot, '.claude', 'commands', specName);

  try {
    // Check if tasks.md exists
    const tasksContent = await fs.readFile(tasksFile, 'utf-8');

    // Create spec commands directory
    await fs.mkdir(commandsSpecDir, { recursive: true });

    // Parse tasks from tasks.md
    const tasks = parseTasksFromMarkdown(tasksContent);

    // Generate command files for each task
    for (const task of tasks) {
      await generateTaskCommand(commandsSpecDir, specName, task);
    }

    console.log(\`✅ Generated \${tasks.length} task commands for spec: \${specName}\`);
    console.log(\`📁 Commands created in: .claude/commands/\${specName}/\`);

    // List generated commands
    console.log('\\n📋 Generated commands:');
    for (const task of tasks) {
      console.log(\`  /\${specName}-task-\${task.id} - \${task.description}\`);
    }

  } catch (error) {
    console.error('Error generating commands:', error.message);
    process.exit(1);
  }
}

function parseTasksFromMarkdown(content) {
  const tasks = [];
  const lines = content.split('\\n');

  for (const line of lines) {
    // Match task lines like "- [ ] 1. Task description" or "- [ ] 2.1 Task description"
    const taskMatch = line.match(/^\\s*-\\s*\\[\\s*\\]\\s*(\\d+(?:\\.\\d+)*)\\s*\\.?\\s*(.+)$/);
    if (taskMatch) {
      const taskId = taskMatch[1];
      const description = taskMatch[2].trim();

      tasks.push({
        id: taskId,
        description: description,
        fullLine: line.trim()
      });
    }
  }

  return tasks;
}

async function generateTaskCommand(commandsDir, specName, task) {
  const commandContent = \`# \${specName} - Task \${task.id}

Execute task \${task.id} for the \${specName} specification.

## Task Description
\${task.description}

## Usage
\\\`\\\`\\\`
/\${specName}-task-\${task.id}
\\\`\\\`\\\`

## Instructions
This command executes a specific task from the \${specName} specification.

**Automatic Execution**: This command will automatically execute:
\\\`\\\`\\\`
/spec-execute \${task.id} \${specName}
\\\`\\\`\\\`

**Process**:
1. Load the \${specName} specification context (requirements.md, design.md, tasks.md)
2. Execute task \${task.id}: "\${task.description}"
3. Follow all implementation guidelines from the main /spec-execute command
4. Mark the task as complete in tasks.md
5. Stop and wait for user review

**Important**: This command follows the same rules as /spec-execute:
- Execute ONLY this specific task
- Mark task as complete by changing [ ] to [x] in tasks.md
- Stop after completion and wait for user approval
- Do not automatically proceed to the next task

## Next Steps
After task completion, you can:
- Review the implementation
- Run tests if applicable
- Execute the next task using /\${specName}-task-[next-id]
- Check overall progress with /spec-status \${specName}
\`;

  const fileName = \`task-\${task.id}.md\`;
  const filePath = path.join(commandsDir, fileName);

  await fs.writeFile(filePath, commandContent, 'utf-8');
}

// Run the script if called directly
if (require.main === module) {
  const specName = process.argv[2];
  generateTaskCommands(specName);
}

module.exports = { generateTaskCommands, parseTasksFromMarkdown };
`;
}
