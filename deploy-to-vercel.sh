#!/bin/bash

# JITConnect - Vercel Deployment Script
# This script automates the deployment process

echo "🚀 JITConnect Deployment to Vercel"
echo "===================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not found!"
    echo "Please initialize git first:"
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m 'Initial commit'"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    git commit -m "$commit_msg"
    echo "✅ Changes committed!"
else
    echo "✅ No uncommitted changes"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push origin main || git push origin master

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo ""
    echo "⚠️  Vercel CLI not found!"
    echo "Install it with: npm install -g vercel"
    echo ""
    read -p "Do you want to install it now? (y/n): " install_vercel
    if [ "$install_vercel" = "y" ]; then
        npm install -g vercel
    else
        echo "Please install Vercel CLI and run this script again."
        exit 1
    fi
fi

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎉 Your site is live!"
echo "Visit: https://jitconnect.vercel.app"
echo ""
