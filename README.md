# Autobot API Documentation

## Table of Contents

- [Autobot API Documentation](#autobot-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Auto-Installation](#auto-installation)
    - [Manual Installation (Backend)](#manual-installation-backend)
    - [Manual Installation (Frontend)](#manual-installation-frontend)
- [Autobot API Endpoints](#autobot-api-endpoints)
  - [Overview](#overview)
  - [1. List of Autobots](#1-list-of-autobots)
  - [2. Get Posts by Autobot](#2-get-posts-by-autobot)
  - [3. Get Comments by Post](#3-get-comments-by-post)

## Introduction

The **Autobot API** is a RESTful API built using Node.js, Express, and Sequelize. It allows developers to manage Autobots, their posts, and associated comments. The API pulls data from a third-party service and stores it in a local database, providing various endpoints for querying this data.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) or any other SQL database supported by Sequelize
- [Vuejs](https://vuejs.org/) A Progressive JavaScript Framework

### Installation

**Clone the repository**:

```bash
git clone https://github.com/johnayinde/tweetAI-app.git

cd tweetAI-app
```

### Auto-Installation

To simplify the setup process, you can use the provided script to automatically install all necessary dependencies for both the frontend and backend projects. This script is designed to work across different operating systems, including Windows, Linux, and macOS.

1. **Download the Script:**
   Ensure you have the script `install_dependencies.sh` in the root directory of your project.

2. **Make the Script Executable (Linux/macOS):**
   ```bash
   chmod +x install_dependencies.sh
   ```
3. **Run the Script**

   ```bash
   ./install_dependencies.sh
   ```

### Manual Installation (Backend)

1.  **Install dependencies**:

    ```bash
    npm install

    OR

    yarn install
    ```

2.  **Rename the .env.example file in the root directory and configure your environment variables**:

    ```bash
    PORT=9090

    CLIENT_URL=http://localhost:8080
    ```

3.  **Running the Application**:

    ```bash
    npm start
    ```

### Manual Installation (Frontend)

1.  **Install dependencies**:

    ```bash
    npm install

    OR

    yarn install
    ```

2.  **Running the Application**:

    ```bash
    npm run serve
    ```

# Autobot API Endpoints

## Overview

The Autobot API provides a set of RESTful endpoints to manage Autobots, their posts, and comments. Below are the available endpoints, including the methods, descriptions, and examples of how to use them.

---

## 1. List of Autobots

- **Endpoint**: `GET /api/autobots`
- **Description**: Retrieves a paginated list of all Autobots.
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
- **Response**:

  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "username": "johndoe",
        "email": "john@example.com",
        "phone": "123-456-7890"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "totalItems": 50
    }
  }
  ```

  **Example Request**:

  ```bash
  curl -X GET "http://localhost:9090/api/autobots?page=1&limit=10"
  ```

## 2. Get Posts by Autobot

- **Endpoint**: `GET /api/autobots/:botId/posts`
- **Description**: Retrieves a paginated list of posts created by a specific Autobot.
- **Path Parameters**:
  - `botId`: The unique ID of the Autobot.
- **Query Parameters**:
  - `page` (optional): Page number (default: 1).
  - `limit` (optional): Number of items per page (default: 10).
- **Response**:

  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Post Title",
        "body": "Post body content...",
        "autobotId": 1
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 2,
      "totalItems": 20
    }
  }
  ```

  **Example Request**:

  ```bash
  curl -X GET "http://localhost:9090/api/autobots/1/posts?page=1&limit=10"
  ```

## 3. Get Comments by Post

- **Endpoint**: `GET /api/posts/:postId/comments`
- **Description**: Retrieves a paginated list of comments for a specific post.
- **Path Parameters**:
  - `postId`: ID of the post
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
- **Response**:

  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Commenter Name",
        "email": "commenter@example.com",
        "body": "Comment content...",
        "postId": 1
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 3,
      "totalItems": 30
    }
  }
  ```

  **Example Request**:

  ```bash
  curl -X GET "http://localhost:9090/api/posts/1/comments?page=1&limit=10"
  ```
