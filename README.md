# Claude Code Spec Workflow

[![npm version](https://badge.fury.io/js/@waltcow%2Fclaude-code-spec-workflow.svg)](https://badge.fury.io/js/@waltcow%2Fclaude-code-spec-workflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Claude Code 的自动化规范驱动工作流。通过 **需求 → 设计 → 任务 → 实现** 流程，将功能想法转化为完整的实现。

## 🚀 快速开始

在任何项目目录中安装并运行：

```bash
npx @waltcow/claude-code-spec-workflow
```

就这么简单！工作流将自动在您的项目中设置完成。

## 📦 安装选项

### NPX（推荐）
```bash
# 在项目目录中运行一次
npx @waltcow/claude-code-spec-workflow

# 测试设置
npx @waltcow/claude-code-spec-workflow test
```

### 全局安装
```bash
# 全局安装
npm install -g @waltcow/claude-code-spec-workflow

# 在任何地方使用
claude-spec-setup
```

### 本地安装
```bash
# 作为开发依赖安装
npm install --save-dev @waltcow/claude-code-spec-workflow

# 通过 package.json 脚本运行
npx claude-spec-setup
```

## 🎯 功能概述

设置自动创建：
- **📁 .claude/ 目录结构** 包含所有必要文件
- **📝 7 个斜杠命令** 用于完整工作流
- **🤖 自动生成的任务命令** 为每个规范生成（新功能！）
- **📋 文档模板** 确保格式一致性
- **⚙️ 配置文件** 用于工作流自动化
- **🔧 命令生成脚本** 用于动态任务命令
- **📖 CLAUDE.md** 包含全面的工作流说明

## 🔄 工作流概览

### 1. **需求阶段** (`/spec-requirements`)
- 生成用户故事和验收标准
- 使用 EARS 格式（WHEN/IF/THEN 语句）
- 确保需求覆盖全面

### 2. **设计阶段** (`/spec-design`)
- 创建技术架构和设计
- 包含 Mermaid 图表进行可视化
- 规划组件、接口和数据模型

### 3. **任务阶段** (`/spec-tasks`)
- 将设计分解为原子编码任务
- 引用特定需求
- 专注于测试驱动开发

### 4. **实现阶段** (`/spec-execute`)
- 系统地执行任务
- 根据需求进行验证
- 确保质量和一致性

## 🛠️ 使用方法

设置后，在 Claude Code 中使用这些命令：

```bash
# 创建新功能规范
/spec-create user-authentication "安全登录系统"

# 生成需求文档
/spec-requirements

# 创建设计文档
/spec-design

# 生成实现任务
/spec-tasks

# 执行特定任务（两种方式）：
/spec-execute 1                    # 传统方式
/user-authentication-task-1       # 新的自动生成命令

# 执行子任务
/user-authentication-task-2.1     # 为子任务自动生成

# 检查状态
/spec-status

# 列出所有规范
/spec-list
```

### 🆕 自动生成的任务命令

工作流现在会自动为每个任务创建单独的命令：
- **更简单的执行**：`/user-auth-task-1` 而不是 `/spec-execute 1 user-authentication`
- **更好的组织**：命令按规范分组在 `.claude/commands/{spec-name}/` 中
- **自动补全**：Claude Code 可以建议特定规范的命令
- **明确的目的**：每个命令都清楚地显示它执行的任务

## 📊 命令行选项

```bash
# 在当前目录设置
npx @waltcow/claude-code-spec-workflow

# 在特定目录设置
npx @waltcow/claude-code-spec-workflow --project /path/to/project

# 强制覆盖现有文件
npx @waltcow/claude-code-spec-workflow --force

# 跳过确认提示
npx @waltcow/claude-code-spec-workflow --yes

# 测试设置
npx @waltcow/claude-code-spec-workflow test
```

## 🎨 特性

### ✅ **零配置**
- 开箱即用，适用于任何项目
- 自动检测项目类型（Node.js、Python、Java 等）
- 验证 Claude Code 安装

### ✅ **交互式设置**
- 美观的 CLI 界面和进度指示器
- 安全性确认提示
- 有用的错误消息和指导

### ✅ **智能文件管理**
- 保留现有的 `CLAUDE.md` 内容
- 创建全面的目录结构
- 包含所有必要的模板和配置

### ✅ **专业品质**
- TypeScript 实现
- 全面的错误处理
- 遵循 npm 最佳实践

## 🏗️ 设置后的项目结构

```
your-project/
├── .claude/
│   ├── commands/
│   │   ├── spec-create.md
│   │   ├── spec-requirements.md
│   │   ├── spec-design.md
│   │   ├── spec-tasks.md
│   │   ├── spec-execute.md
│   │   ├── spec-status.md
│   │   ├── spec-list.md
│   │   └── {spec-name}/              # 自动生成（新功能！）
│   │       ├── task-1.md
│   │       ├── task-2.md
│   │       └── task-2.1.md
│   ├── scripts/                      # 新功能！
│   │   ├── generate-commands.bat     # Windows 脚本
│   │   ├── generate-commands.sh      # macOS/Linux 脚本
│   │   ├── generate-commands-launcher.sh  # 操作系统检测启动器
│   │   └── README.md                 # 脚本文档
│   ├── templates/
│   │   ├── requirements-template.md
│   │   ├── design-template.md
│   │   └── tasks-template.md
│   ├── specs/
│   │   └── (您的规范将在此创建)
│   └── spec-config.json
└── CLAUDE.md (创建/更新)
```

## 🧪 测试

该包包含内置测试命令：

```bash
# 在临时目录中测试设置
npx @waltcow/claude-code-spec-workflow test
```

## 📋 要求

- **Node.js** 16.0.0 或更高版本
- **Claude Code** 已安装并配置
- 任何项目目录

## 🔧 故障排除

### 常见问题

**❓ NPX 后找不到命令**
```bash
# 确保使用正确的包名
npx @waltcow/claude-code-spec-workflow
```

**❓ 设置失败并出现权限错误**
```bash
# 尝试使用不同的目录权限
npx @waltcow/claude-code-spec-workflow --project ~/my-project
```

**❓ 未检测到 Claude Code**
```bash
# 首先安装 Claude Code
npm install -g @anthropic-ai/claude-code
```

### 调试信息

```bash
# 显示详细输出
DEBUG=* npx @waltcow/claude-code-spec-workflow

# 检查包版本
npx @waltcow/claude-code-spec-workflow --version
```

## 🌟 示例

### 基本用法
```bash
cd my-awesome-project
npx @waltcow/claude-code-spec-workflow
claude
# 输入：/spec-create user-dashboard "用户资料管理"
```

### 高级用法
```bash
# 设置多个项目
for dir in project1 project2 project3; do
  npx @waltcow/claude-code-spec-workflow --project $dir --yes
done
```

## 📚 文档

- **[完整文档](https://github.com/waltcow/claude-code-spec-workflow#readme)**
- **[Claude Code 文档](https://docs.anthropic.com/claude-code)**

## 🤝 贡献

欢迎贡献！请查看我们的[贡献指南](https://github.com/waltcow/claude-code-spec-workflow/blob/main/CONTRIBUTING.md)。

## 📄 许可证

MIT 许可证 - 详情请见 [LICENSE](https://github.com/waltcow/claude-code-spec-workflow/blob/main/LICENSE)。

## 🏷️ 更新日志

版本历史请见 [CHANGELOG.md](https://github.com/waltcow/claude-code-spec-workflow/blob/main/CHANGELOG.md)。

---

**通过自动化规范驱动开发转变您的开发工作流！** 🚀

由 [waltcow](https://github.com/waltcow) 用 ❤️ 制作

## 致谢

- [Claude Code](https://docs.anthropic.com/claude-code)
- [Kiro](https://kiro.dev/)
- [Easy Approach to Requirements Syntax](https://en.wikipedia.org/wiki/Easy_Approach_to_Requirements_Syntax)
- [Mermaid](https://mermaid.js.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)