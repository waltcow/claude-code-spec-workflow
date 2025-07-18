#!/bin/bash

# Claude Code Spec Workflow - Development Setup Script
# This script sets up the development environment

set -e

echo "🛠️  Setting up development environment..."

# Check Node.js version
node_version=$(node --version)
echo "📊 Node.js version: $node_version"

# Check npm version
npm_version=$(npm --version)
echo "📊 npm version: $npm_version"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install global dependencies for development
echo "🌐 Installing global dev dependencies..."
npm install -g typescript ts-node

# Create git hooks (optional)
if [ -d ".git" ]; then
    echo "🪝 Setting up git hooks..."
    
    # Pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
npm run test
EOF
    chmod +x .git/hooks/pre-commit
    
    echo "✅ Git hooks configured"
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm test

echo "✅ Development environment setup complete!"
echo ""
echo "🎯 Available commands:"
echo "   npm run dev      - Run in development mode"
echo "   npm run build    - Build for production"
echo "   npm run test     - Run tests"
echo "   npm run lint     - Run linter"
echo "   npm run format   - Format code"
echo ""
echo "🚀 To test locally:"
echo "   npm run dev"
echo "   # or"
echo "   npx ts-node src/cli.ts"