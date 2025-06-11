# Azure Blob Storage Static Site Deployment Guide

## Prerequisites
- Azure account and subscription
- Azure CLI installed (or use Azure Portal)

## Step 1: Build the Application

First, let's create a production build:

```bash
cd dashboard
npm install
npm run build
```

This creates a `build/` directory with your static files.

## Step 2: Create Azure Resources

### Option A: Using Azure Portal (GUI)

1. **Create Resource Group** (if needed)
   - Go to Azure Portal → Resource groups → Create
   - Name: `lims-dashboard-rg`
   - Region: Choose closest to you

2. **Create Storage Account**
   - Go to Storage accounts → Create
   - Resource group: `lims-dashboard-rg`
   - Storage account name: `limsdashboard` (must be globally unique)
   - Region: Same as resource group
   - Performance: Standard
   - Redundancy: LRS (Locally-redundant storage) - cheapest option
   - Click "Review + create" → "Create"

3. **Enable Static Website**
   - Go to your storage account
   - Left menu → Data management → Static website
   - Enable: Yes
   - Index document name: `index.html`
   - Error document path: `index.html` (this enables React Router to work)
   - Save
   - Copy the "Primary endpoint" URL - this is your website URL!

4. **Upload Files**
   - Go to Storage browser → Blob containers → `$web`
   - Click "Upload"
   - Select all files and folders from your `build/` directory
   - Click "Upload"

### Option B: Using Azure CLI

```bash
# Variables
RESOURCE_GROUP="lims-dashboard-rg"
STORAGE_ACCOUNT="limsdashboard$(date +%s)" # Adds timestamp for uniqueness
LOCATION="eastus" # Change to your preferred location

# Login to Azure
az login

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create storage account
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --kind StorageV2

# Enable static website
az storage blob service-properties update \
  --account-name $STORAGE_ACCOUNT \
  --static-website \
  --404-document index.html \
  --index-document index.html

# Get the connection string
CONNECTION_STRING=$(az storage account show-connection-string \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query connectionString \
  --output tsv)

# Upload all files
az storage blob upload-batch \
  --source ./build \
  --destination '$web' \
  --connection-string "$CONNECTION_STRING"

# Get the website URL
echo "Your website URL is:"
az storage account show \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query "primaryEndpoints.web" \
  --output tsv
```

## Step 3: Configure CORS (if needed for APIs)

If your app makes API calls, configure CORS:

### Portal:
1. Storage account → Resource sharing (CORS) → Blob service
2. Add:
   - Allowed origins: `*` (or specific domains)
   - Allowed methods: GET, POST, PUT, DELETE, OPTIONS
   - Allowed headers: `*`
   - Exposed headers: `*`
   - Max age: 3600

### CLI:
```bash
az storage cors add \
  --services b \
  --methods DELETE GET HEAD MERGE OPTIONS POST PUT \
  --origins '*' \
  --allowed-headers '*' \
  --exposed-headers '*' \
  --max-age 3600 \
  --account-name $STORAGE_ACCOUNT
```

## Step 4: Test Your Deployment

1. Navigate to your Primary endpoint URL
2. Test different routes:
   - `/` - Overview page
   - `/prep` - Prep dashboard
   - `/receiving` - Receiving page
   - etc.

## Updating Your Site

To update after making changes:

### Portal:
1. Run `npm run build` locally
2. Go to Storage browser → `$web` container
3. Delete all existing files
4. Upload new files from `build/` directory

### CLI:
```bash
# Rebuild
npm run build

# Re-upload (overwrites existing files)
az storage blob upload-batch \
  --source ./build \
  --destination '$web' \
  --connection-string "$CONNECTION_STRING" \
  --overwrite
```

## Cost Optimization

- **Storage**: ~$0.02/GB per month
- **Bandwidth**: First 5GB/month free, then ~$0.08/GB
- **Transactions**: $0.0004 per 10,000 transactions

For a typical dashboard:
- Storage: < $0.01/month
- Bandwidth: Usually free tier
- Total: **< $1/month**

## Troubleshooting

### Issue: Routes return 404
- Make sure Error document path is set to `index.html`
- This allows React Router to handle routing

### Issue: Changes don't appear
- Browser might be caching - try Ctrl+F5
- Add cache headers during upload if needed

### Issue: CORS errors
- Configure CORS in storage account settings
- Make sure to include OPTIONS in allowed methods

## Security Considerations

1. **Public Access**: Your site is publicly accessible
2. **No Authentication**: Consider adding Azure AD if needed
3. **HTTPS**: Enabled by default on Azure blob endpoints
4. **Custom Domain**: Can add your own domain with Azure CDN

## Next Steps

1. **Custom Domain**: 
   - Create Azure CDN profile
   - Point to your storage account
   - Configure custom domain with SSL

2. **CI/CD Pipeline**:
   - Set up GitHub Actions or Azure DevOps
   - Automate build and deployment

3. **Monitoring**:
   - Enable Azure Application Insights
   - Monitor usage and performance