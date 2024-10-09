
# Issue Tracker

## Overview

Issue Tracker is a web platform where users can submit queries and receive responses from authorized administrators via a secure login portal.

## Table of Contents

- [Installation Guide](#installation-guide)
- [Features](#features)
- [Screenshots](#screenshots)
- [Authors](#authors)

## Installation Guide

To set up the Issue Tracker on your local machine, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/architdhakar/Issue-Tracker.git
   cd Issue-Tracker
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up MongoDB**

   Make sure MongoDB is installed and running on your local machine. You can download it from [MongoDB's official website](https://www.mongodb.com/try/download/community).

4. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your MongoDB connection string and other necessary environment variables.

   ```bash
   MONGO_URL=your_mongodb_connection_string
   ```

5. **Start the Application**

   ```bash
   node server.js
   ```

6. **Access the Application**

   Open your browser and navigate to `http://localhost:4000`.

## Features

- User authentication and authorization
- Query submission by users
- Query management and responses by administrators
- Secure login portal for administrators

## Screenshots

![Dashboard](https://github.com/architdhakar/Issue-Tracker/assets/117572754/38f49209-ab0a-4958-b44e-6618bf41fdb0)
*Dashboard View*

![Query List](https://github.com/architdhakar/Issue-Tracker/assets/117572754/68ffb8f7-476e-4dd0-b452-768013865c98)
*Query List*

![Query Details](https://github.com/architdhakar/Issue-Tracker/assets/117572754/5a214cb5-aa31-42b2-b785-8bf7a2b3f292)
*Query Details*

![Admin Login](https://github.com/architdhakar/Issue-Tracker/assets/117572754/70a95e26-09b0-466a-9c5d-1f7f9586803d)
*Admin Login*

![User Query](https://github.com/architdhakar/Issue-Tracker/assets/117572754/188a6b37-e182-44f6-b0e1-779f4ed2e4b9)
*User Query Submission*

## Authors

- **Archit Dhakar**


