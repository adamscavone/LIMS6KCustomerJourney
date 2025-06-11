#!/bin/bash

# Deployment script for LIMS Dashboard to Vercel

echo "🚀 Deploying LIMS Dashboard to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "📋 Deployment Configuration:"
echo "- Project: LIMS Dashboard"
echo "- Framework: React"
echo "- Build Command: npm run build"
echo "- Output Directory: build"
echo ""

# Deploy with Vercel
echo "🔧 Starting deployment..."
echo "You'll be prompted to:"
echo "1. Log in to Vercel (if not already)"
echo "2. Confirm project settings"
echo "3. Choose a project name (or use default)"
echo ""

vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "Your app should now be accessible at the URL provided above."
echo ""
echo "💡 Tips:"
echo "- Save the URL for sharing"
echo "- Future deployments: just run 'vercel --prod' again"
echo "- Set up Git integration for automatic deployments"