# Azure Blob Storage Static Site Deployment Script for LIMS Dashboard (PowerShell)

Write-Host "🚀 Azure Blob Storage Deployment for LIMS Dashboard" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$ResourceGroup = "lims-dashboard-rg"
$StorageAccountBase = "limsdashboard"
$Location = "eastus"

# Check if Azure CLI is installed
try {
    $null = az --version
} catch {
    Write-Host "❌ Azure CLI is not installed." -ForegroundColor Red
    Write-Host "Please install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
}

# Check if logged in to Azure
Write-Host "🔐 Checking Azure login status..." -ForegroundColor Yellow
$account = az account show 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please log in to Azure:"
    az login
}

# Show current subscription
Write-Host ""
Write-Host "📋 Current Azure subscription:" -ForegroundColor Yellow
az account show --query "[name, id]" -o tsv
Write-Host ""
$confirmation = Read-Host "Is this the correct subscription? (y/n)"
if ($confirmation -ne 'y') {
    Write-Host "Please run 'az account set --subscription <subscription-id>' to switch subscriptions"
    exit 1
}

# Generate unique storage account name
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$StorageAccount = "$StorageAccountBase$timestamp"
Write-Host "📦 Storage account name: $StorageAccount" -ForegroundColor Green

# Build the application
Write-Host ""
Write-Host "🔨 Building React application..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}
npm run build

if (!(Test-Path "build")) {
    Write-Host "❌ Build failed. Please check for errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Create Resource Group
Write-Host ""
Write-Host "🏗️  Creating resource group..." -ForegroundColor Yellow
az group create `
    --name $ResourceGroup `
    --location $Location `
    --output none

Write-Host "✅ Resource group created: $ResourceGroup" -ForegroundColor Green

# Create Storage Account
Write-Host ""
Write-Host "🏗️  Creating storage account..." -ForegroundColor Yellow
az storage account create `
    --name $StorageAccount `
    --resource-group $ResourceGroup `
    --location $Location `
    --sku Standard_LRS `
    --kind StorageV2 `
    --output none

Write-Host "✅ Storage account created: $StorageAccount" -ForegroundColor Green

# Enable static website
Write-Host ""
Write-Host "🌐 Enabling static website hosting..." -ForegroundColor Yellow
az storage blob service-properties update `
    --account-name $StorageAccount `
    --static-website `
    --404-document index.html `
    --index-document index.html `
    --output none

Write-Host "✅ Static website enabled" -ForegroundColor Green

# Get connection string
$ConnectionString = az storage account show-connection-string `
    --name $StorageAccount `
    --resource-group $ResourceGroup `
    --query connectionString `
    --output tsv

# Upload files
Write-Host ""
Write-Host "📤 Uploading files to Azure..." -ForegroundColor Yellow
az storage blob upload-batch `
    --source ./build `
    --destination '$web' `
    --connection-string $ConnectionString `
    --output none

Write-Host "✅ Files uploaded successfully" -ForegroundColor Green

# Configure CORS
Write-Host ""
Write-Host "🔧 Configuring CORS..." -ForegroundColor Yellow
az storage cors add `
    --services b `
    --methods DELETE GET HEAD MERGE OPTIONS POST PUT `
    --origins '*' `
    --allowed-headers '*' `
    --exposed-headers '*' `
    --max-age 3600 `
    --account-name $StorageAccount `
    --output none

Write-Host "✅ CORS configured" -ForegroundColor Green

# Get the website URL
$WebsiteUrl = az storage account show `
    --name $StorageAccount `
    --resource-group $ResourceGroup `
    --query "primaryEndpoints.web" `
    --output tsv

# Save deployment info
Write-Host ""
Write-Host "💾 Saving deployment information..." -ForegroundColor Yellow
@"
Azure Deployment Information
============================
Date: $(Get-Date)
Resource Group: $ResourceGroup
Storage Account: $StorageAccount
Website URL: $WebsiteUrl
Connection String: $ConnectionString

To update the site:
az storage blob upload-batch --source ./build --destination '$web' --connection-string "$ConnectionString" --overwrite
"@ | Out-File -FilePath "azure-deployment-info.txt"

Write-Host "✅ Deployment information saved to: azure-deployment-info.txt" -ForegroundColor Green

# Display summary
Write-Host ""
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your LIMS Dashboard is now live at:" -ForegroundColor Cyan
Write-Host "   $WebsiteUrl" -ForegroundColor White
Write-Host ""
Write-Host "📋 Storage Account: $StorageAccount" -ForegroundColor Yellow
Write-Host "📋 Resource Group: $ResourceGroup" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 To update your site in the future:" -ForegroundColor Cyan
Write-Host "   1. Make your changes"
Write-Host "   2. Run: npm run build"
Write-Host "   3. Run: .\update-azure.ps1"
Write-Host ""
Write-Host "💰 Estimated cost: < `$1/month" -ForegroundColor Green
Write-Host ""

# Create update script
@'
# Update script for LIMS Dashboard on Azure
Write-Host "🔄 Updating LIMS Dashboard on Azure..." -ForegroundColor Cyan

# Check if deployment info exists
if (!(Test-Path "azure-deployment-info.txt")) {
    Write-Host "❌ azure-deployment-info.txt not found. Please run deploy-azure.ps1 first." -ForegroundColor Red
    exit 1
}

# Extract connection string
$content = Get-Content "azure-deployment-info.txt"
$connectionLine = $content | Where-Object { $_ -match "Connection String:" }
$ConnectionString = $connectionLine -replace "Connection String: ", ""

# Build
Write-Host "🔨 Building application..." -ForegroundColor Yellow
npm run build

# Upload
Write-Host "📤 Uploading to Azure..." -ForegroundColor Yellow
az storage blob upload-batch `
    --source ./build `
    --destination '$web' `
    --connection-string $ConnectionString `
    --overwrite `
    --output none

Write-Host "✅ Update complete!" -ForegroundColor Green
Write-Host "🌐 Your changes are now live." -ForegroundColor Cyan
'@ | Out-File -FilePath "update-azure.ps1"

Write-Host "✅ Created update-azure.ps1 for future deployments" -ForegroundColor Green