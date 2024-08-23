#!/bin/bash

# Define directories
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"

# Function to install npm packages for the frontend
install_frontend() {
    echo "Installing frontend packages..."
    if [ -d "$FRONTEND_DIR" ]; then
        cd "$FRONTEND_DIR" || exit
        if [ -f "package.json" ]; then
            npm install
        else
            echo "No package.json found in $FRONTEND_DIR"
        fi
        cd ..
    else
        echo "Frontend directory $FRONTEND_DIR not found"
    fi
}

# Function to install pip packages for the backend
install_backend() {
    echo "Installing backend packages..."
    if [ -d "$BACKEND_DIR" ]; then
        cd "$BACKEND_DIR" || exit
        if [ -f "requirements.txt" ]; then
            pip install -r requirements.txt
        else
            echo "No requirements.txt found in $BACKEND_DIR"
        fi
        cd ..
    else
        echo "Backend directory $BACKEND_DIR not found"
    fi
}

# Detect OS and run the appropriate installation commands
install_dependencies() {
    OS="$(uname -s)"
    case "$OS" in
        Linux*)     install_frontend; install_backend;;
        Darwin*)    install_frontend; install_backend;;
        CYGWIN*)    install_frontend; install_backend;;
        MINGW*)     install_frontend; install_backend;;
        MSYS*)      install_frontend; install_backend;;
        *)          echo "Unsupported OS: $OS"; exit 1;;
    esac
}

# Run the installation
install_dependencies
