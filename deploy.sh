#!/bin/bash

# Simple deployment script for Breaking Into Code Angular application

echo "=================================================="
echo "     Breaking Into Code Deployment Script"
echo "=================================================="

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
  echo "PM2 is not installed. Installing PM2 globally..."
  npm install -g pm2
fi

# Stop existing PM2 process if it exists
echo "Checking for existing PM2 process..."
pm2 describe breaking-into-code > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Stopping existing PM2 process: breaking-into-code"
  pm2 stop breaking-into-code
  pm2 delete breaking-into-code
fi

# Deploy application using PM2
echo "Deploying application with PM2..."
pm2 start "ng serve" --name breaking-into-code

# Save PM2 configuration
pm2 save

echo "=================================================="
echo "  Deployment Complete!"
echo "  Application: breaking-into-code"
echo "  URL: http://localhost:4200"
echo "=================================================="