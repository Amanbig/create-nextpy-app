# NextJS + Python Backend Demo

This is a sample NextJS application that demonstrates how to make requests from the frontend to a Python FastAPI backend through NextJS API routes.

## Architecture

```
Frontend (React/NextJS) → NextJS API Routes → Python Backend (FastAPI)
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── backend/
│   │       └── route.ts          # NextJS API route that forwards requests to Python backend
│   ├── page.tsx                  # Main page component
│   └── layout.tsx                # Layout component
├── components/
│   └── BackendDemo.tsx           # Demo component with GET/POST examples
└── lib/
    └── api.ts                    # API utility functions
```

## Features

- **GET Request**: Fetches data from Python backend through NextJS API route
- **POST Request**: Sends data to Python backend through NextJS API route
- **Error Handling**: Comprehensive error handling with user feedback
- **TypeScript**: Full TypeScript support for type safety
- **Tailwind CSS**: Styled with Tailwind CSS for modern UI

## Setup Instructions

### 1. Backend Setup (Python FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn app:app --reload
```

The backend will run on `http://localhost:8000`

### 2. Frontend Setup (NextJS)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the frontend root with:

```env
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## API Endpoints

### NextJS API Routes

- `GET /api/backend` - Forwards GET request to Python backend
- `POST /api/backend` - Forwards POST request to Python backend

### Python Backend Endpoints

- `GET /` - Returns a welcome message
- `POST /` - Echoes back the sent data with a response message

## How It Works

1. **Frontend Component** (`BackendDemo.tsx`):
   - Uses React hooks to manage state
   - Makes requests to NextJS API routes (not directly to Python backend)
   - Displays responses and handles errors

2. **NextJS API Route** (`/api/backend/route.ts`):
   - Receives requests from frontend
   - Forwards requests to Python backend
   - Returns formatted responses to frontend

3. **API Utilities** (`lib/api.ts`):
   - Provides helper functions for making API calls
   - Includes error handling and TypeScript types

4. **Python Backend** (`app.py`):
   - FastAPI server with CORS enabled
   - Handles GET and POST requests
   - Returns JSON responses

## Benefits of This Architecture

1. **Security**: Frontend never directly exposes backend URLs
2. **Flexibility**: Can add authentication, rate limiting, etc. in NextJS API routes
3. **Type Safety**: Full TypeScript support throughout the frontend
4. **Error Handling**: Centralized error handling in API routes
5. **Environment Management**: Different backend URLs for dev/staging/production

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Python backend has CORS configured correctly
2. **Connection Refused**: Ensure both backend (port 8000) and frontend (port 3000) are running
3. **404 Errors**: Check that API routes are in the correct directory structure
4. **TypeScript Errors**: Ensure all dependencies are installed with `npm install`

### Development Tips

1. Check browser Network tab to see API calls
2. Check browser Console for JavaScript errors
3. Check backend logs for Python errors
4. Use environment variables for different backend URLs

## Testing the Integration

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Click "Fetch Data from Backend" to test GET request
4. Enter some text and click "Send Data to Backend" to test POST request
5. Check the responses displayed on the page

## Next Steps

- Add authentication to API routes
- Implement database integration in Python backend
- Add more complex data operations
- Deploy to production with proper environment configuration
