# React Chat Application

A full-stack real-time chat application inspired by modern messaging platforms. The project is built with React, Node.js, Express, MongoDB, and TypeScript.

REST API for the React Chat application.

---

# Link 

https://chat-bot-pudge.vercel.app/

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## Installation

### Clone repository

```bash
git clone https://github.com/pudgynator/chat-server.git
```

---

## Features

- Authentication
- Contacts API
- Chats API
- JWT authorization
- Chats & Messages Engine
- MongoDB database

---

### Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

### Create a `.env` file inside the **server** directory with the following content:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://chat-bot-pudge.vercel.app
```

## Running the Application

```bash
cd server
npm run dev
```
---