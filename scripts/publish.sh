#!/bin/bash

# Claude Code Spec Workflow - Publish Script
# This script builds and publishes the NPM package

set -e

echo "🚀 Publishing Claude Code Spec Workflow..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the right directory?"
    exit 1
fi

# Check if logged in to npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Error: Not logged in to npm. Run 'npm login' first."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm test

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

# Version bump (optional)
read -p "🏷️  Bump version? (patch/minor/major/skip): " version_bump
if [ "$version_bump" != "skip" ]; then
    npm version $version_bump
fi

# Publish to npm
echo "📤 Publishing to npm..."
npm publish --access public

# Get package info
PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")

echo "✅ Successfully published $PACKAGE_NAME@$PACKAGE_VERSION"
echo ""
echo "🎉 Users can now install with:"
echo "   npx $PACKAGE_NAME"
echo ""
echo "📊 Check package stats:"
echo "   https://www.npmjs.com/package/$PACKAGE_NAME"
echo ""
echo "🔄 Next steps:"
echo "   1. Update README badges"
echo "   2. Create GitHub release"
echo "   3. Update CHANGELOG.md"
echo "   4. Announce on social media"