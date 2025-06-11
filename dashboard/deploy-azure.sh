#!/bin/bash

# Azure Blob Storage Static Site Deployment Script for LIMS Dashboard

echo "🚀 Azure Blob Storage Deployment for LIMS Dashboard"
echo "=================================================="
echo ""

# Configuration
RESOURCE_GROUP="lims-dashboard-rg"
STORAGE_ACCOUNT_BASE="limsdashboard"
LOCATION="eastus"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed."
    echo "Please install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if logged in to Azure
echo "🔐 Checking Azure login status..."
if ! az account show &> /dev/null; then
    echo "Please log in to Azure:"
    az login
fi

# Show current subscription
echo ""
echo "📋 Current Azure subscription:"
az account show --query "[name, id]" -o tsv
echo ""
read -p "Is this the correct subscription? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please run 'az account set --subscription <subscription-id>' to switch subscriptions"
    exit 1
fi

# Generate unique storage account name
STORAGE_ACCOUNT="${STORAGE_ACCOUNT_BASE}$(date +%s)"
echo "📦 Storage account name: $STORAGE_ACCOUNT"

# Build the application
echo ""
echo "🔨 Building React application..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi
npm run build

if [ ! -d "build" ]; then
    echo "❌ Build failed. Please check for errors above."
    exit 1
fi

echo "✅ Build completed successfully!"

# Create Resource Group
echo ""
echo "🏗️  Creating resource group..."
az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION \
    --output none

echo "✅ Resource group created: $RESOURCE_GROUP"

# Create Storage Account
echo ""
echo "🏗️  Creating storage account..."
az storage account create \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku Standard_LRS \
    --kind StorageV2 \
    --output none

echo "✅ Storage account created: $STORAGE_ACCOUNT"

# Enable static website
echo ""
echo "🌐 Enabling static website hosting..."
az storage blob service-properties update \
    --account-name $STORAGE_ACCOUNT \
    --static-website \
    --404-document index.html \
    --index-document index.html \
    --output none

echo "✅ Static website enabled"

# Get connection string
CONNECTION_STRING=$(az storage account show-connection-string \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --query connectionString \
    --output tsv)

# Upload files
echo ""
echo "📤 Uploading files to Azure..."
az storage blob upload-batch \
    --source ./build \
    --destination '$web' \
    --connection-string "$CONNECTION_STRING" \
    --output none

echo "✅ Files uploaded successfully"

# Configure CORS
echo ""
echo "🔧 Configuring CORS..."
az storage cors add \
    --services b \
    --methods DELETE GET HEAD MERGE OPTIONS POST PUT \
    --origins '*' \
    --allowed-headers '*' \
    --exposed-headers '*' \
    --max-age 3600 \
    --account-name $STORAGE_ACCOUNT \
    --output none

echo "✅ CORS configured"

# Get the website URL
WEBSITE_URL=$(az storage account show \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --query "primaryEndpoints.web" \
    --output tsv)

# Save deployment info
echo ""
echo "💾 Saving deployment information..."
cat > azure-deployment-info.txt << EOF
Azure Deployment Information
============================
Date: $(date)
Resource Group: $RESOURCE_GROUP
Storage Account: $STORAGE_ACCOUNT
Website URL: $WEBSITE_URL
Connection String: $CONNECTION_STRING

To update the site:
az storage blob upload-batch --source ./build --destination '\$web' --connection-string "$CONNECTION_STRING" --overwrite
EOF

echo "✅ Deployment information saved to: azure-deployment-info.txt"

# Display summary
echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo ""
echo "🌐 Your LIMS Dashboard is now live at:"
echo "   $WEBSITE_URL"
echo ""
echo "📋 Storage Account: $STORAGE_ACCOUNT"
echo "📋 Resource Group: $RESOURCE_GROUP"
echo ""
echo "💡 To update your site in the future:"
echo "   1. Make your changes"
echo "   2. Run: npm run build"
echo "   3. Run: ./update-azure.sh"
echo ""
echo "💰 Estimated cost: < $1/month"
echo ""

# Create update script
cat > update-azure.sh << 'EOF'
#!/bin/bash
echo "🔄 Updating LIMS Dashboard on Azure..."

# Check if deployment info exists
if [ ! -f "azure-deployment-info.txt" ]; then
    echo "❌ azure-deployment-info.txt not found. Please run deploy-azure.sh first."
    exit 1
fi

# Extract connection string
CONNECTION_STRING=$(grep "Connection String:" azure-deployment-info.txt | cut -d' ' -f3-)

# Build
echo "🔨 Building application..."
npm run build

# Upload
echo "📤 Uploading to Azure..."
az storage blob upload-batch \
    --source ./build \
    --destination '$web' \
    --connection-string "$CONNECTION_STRING" \
    --overwrite \
    --output none

echo "✅ Update complete!"
echo "🌐 Your changes are now live."
EOF

chmod +x update-azure.sh
echo "✅ Created update-azure.sh for future deployments"