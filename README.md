# BuddyTalk

A real-time video chat application built with React and LiveKit.

> **Note**: This application uses the setup scripts to fix OpenSSL issues with Node.js v17+ 

## Features

- Real-time audio and video communication
- Simple room-based collaboration
- User authentication with LiveKit tokens
- Clean and intuitive UI

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- A LiveKit account and project (for API key and secret)

## Project Structure

```
buddytalk-web/
├── public/              # Static assets
├── server/              # Express server for token generation
│   ├── index.js         # Server entry point
│   ├── package.json     # Server dependencies
│   └── .env             # Environment variables (not committed)
└── src/                 # React application
    ├── App.js           # Main application component
    ├── App.css          # Application styles
    └── ...              # Other React files
```

## Setup Instructions

### Option 1: Using setup scripts (Recommended)

We've provided setup scripts that handle all dependencies and fix common issues:

**For Unix/Mac users:**
```bash
cd buddytalk-web
chmod +x setup.sh  # Make the script executable
./setup.sh
```

**For Windows users:**
```cmd
cd buddytalk-web
setup.bat
```

### Option 2: Manual setup

### Step 1: Install client dependencies

```bash
cd buddytalk-web
npm install
```

### Step 2: Configure the server

1. Navigate to the server directory:

```bash
cd server
npm install
```

2. Create a `.env` file in the server directory with your LiveKit credentials:

```
PORT=4000
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-livekit-server.livekit.cloud
```

Replace the placeholders with your actual LiveKit credentials.

### Step 3: Update the client configuration

In `src/App.js`, update the LiveKit server URL:

```javascript
setUrl('wss://your-livekit-server.livekit.cloud');
```

Replace with your actual LiveKit server URL.

## Running the Application

### Start the token server

```bash
cd server
npm start
```

This will start the token server on port 4000.

### Start the React application

In a new terminal:

```bash
cd buddytalk-web
npm start
```

## Troubleshooting

### OpenSSL Error

If you encounter this error with Node.js v17 or higher:
```
Error: error:0308010C:digital envelope routines::unsupported
```

This is because Node.js v17+ uses OpenSSL 3, which has removed support for some legacy algorithms. We've already modified the npm scripts to handle this, but if you're running the application in a different way, you can:

1. Use the `NODE_OPTIONS=--openssl-legacy-provider` environment variable:
   ```bash
   NODE_OPTIONS=--openssl-legacy-provider node your-script.js
   ```

2. Or downgrade to Node.js v16.x which uses OpenSSL 1.1.1

This will start the React development server on port 3000.

Open your browser and navigate to http://localhost:3000 to use the application.

## Usage

1. Enter a room name and your display name
2. Click "Join Room" to enter the video conference
3. Grant camera and microphone permissions when prompted
4. Enjoy your video chat!

## Deployment

### Client deployment

Build the React application for production:

```bash
npm run build
```

The production-ready files will be in the `build` directory.

### Server deployment

Deploy the Express server to a Node.js hosting service of your choice. Make sure to set the environment variables.

## Getting a LiveKit Account

1. Sign up at [LiveKit Cloud](https://cloud.livekit.io)
2. Create a new project
3. Get your API key and secret from the project dashboard

## License

MIT