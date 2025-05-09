# BreakingIntoCodeApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

## Getting Started

### Cloning the Repository

```bash
# Clone the repository
git clone https://github.com/username/breaking-into-code.git

# Navigate to the project directory
cd breaking-into-code/frontend

# Install dependencies
npm install
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js and npm**: Required to run Angular applications
- **Angular CLI**: Install globally with `npm install -g @angular/cli`
- **PM2**: For deployment, install globally with `npm install -g pm2`

### Upgrading Node.js Using NVM

NVM (Node Version Manager) is recommended for managing Node.js versions. To upgrade Node.js using NVM:

```bash
# Install NVM (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or source ~/.zshrc for Zsh users

# Install a specific Node.js version
nvm install 22.16.0  # or another version

# Use the installed version
nvm use 22.16.0

# Set it as default (optional)
nvm alias default 22.16.0

# Verify the active Node.js version
node --version
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200/` in your browser.

## Development

```bash
# Generate a new component
ng generate component component-name

# Build the project
ng build

# Run unit tests
ng test
```

## Deployment

### Full Deployment Process

For a complete deployment from scratch:

```bash
# 1. Clone the repository
git clone https://github.com/username/breaking-into-code.git

# 2. Navigate to the project directory
cd breaking-into-code/frontend

# 3. Install dependencies
npm install

# 4. Build the application for production
ng build --prod

# 5. Install PM2 if needed
npm install -g pm2

# 6. Deploy using PM2
# For development:
pm2 start "ng serve" --name breaking-into-code

# For production (if using a static file server like 'serve'):
# npm install -g serve
# pm2 start serve --name breaking-into-code -- -s dist/frontend/browser -l 4200
```

### Quick Deployment

If you've already set up the project and just need to deploy:

```bash
# Option 1: Direct PM2 command
pm2 start "ng serve" --name breaking-into-code

# Option 2: Using the deployment script
chmod +x deploy.sh
./deploy.sh
```

The deployment script will:
- Check if PM2 is installed and install it if needed
- Stop any existing instances of the application
- Start the application with PM2
- Save the PM2 configuration

### PM2 Management

```bash
# Check status
pm2 status

# View logs
pm2 logs breaking-into-code

# Restart the application
pm2 restart breaking-into-code

# Stop the application
pm2 stop breaking-into-code
```

## Additional Resources

For more information, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
