# NextPy Full-Stack Project

A full-stack application combining NextJS frontend with Python backend (FastAPI or RunAPI).

## 🚀 Quick Start

Run both frontend and backend with a single command:

```bash
npm run dev
```

This will start:
- **Frontend** on http://localhost:3000
- **Backend** on http://localhost:8000

## 📁 Project Structure

```
project/
├── package.json          # Root package.json with convenient scripts
├── frontend/             # NextJS application
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/      # NextJS API routes
│   │   │   └── page.tsx  # Main page with simple demo
│   │   ├── components/   # React components (BackendDemo)
│   │   └── lib/          # API utilities
│   └── package.json
└── backend/              # Python backend (FastAPI or RunAPI)
    ├── app.py (FastAPI)  # FastAPI server with traditional routing
    │   OR
    ├── routes/ (RunAPI)  # File-based routing structure
    │   ├── index.py      # GET / endpoint
    │   └── api/          # API routes
    ├── main.py (RunAPI)  # RunAPI application entry point
    ├── requirements.txt  # Python dependencies
    ├── package.json      # Backend npm scripts
    └── venv/             # Python virtual environment
```

## 📜 Available Scripts

### Root Directory Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both frontend and backend in development mode |
| `npm run frontend` | Run only the frontend |
| `npm run backend` | Run only the backend |
| `npm run build` | Build frontend for production |
| `npm run start` | Run both in production mode |
| `npm run install:all` | Install all dependencies (frontend + root) |

### Frontend Scripts (in `/frontend` directory)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend Scripts (in `/backend` directory)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with hot reload (works for both FastAPI and RunAPI) |
| `npm run start` | Start backend in production mode |
| `npm run install` | Install Python dependencies |

**Note**: The backend automatically uses the appropriate development server:
- **FastAPI**: Uses `uvicorn app:app --reload`
- **RunAPI**: Uses `runapi dev` with file-based routing

## 🔧 Manual Setup

If you need to set up manually or troubleshoot:

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Activate virtual environment:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start server:
   ```bash
   # For FastAPI projects
   uvicorn app:app --reload
   
   # For RunAPI projects  
   runapi dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## 🌐 API Routes

The project includes NextJS API routes that proxy requests to the Python backend:

- **GET /api/backend** - Forwards to Python backend GET endpoint

The demo includes a simple GET request example to test the full-stack connection.

## 🔄 Data Flow

```
Frontend → NextJS API Routes → Python Backend → NextJS API Routes → Frontend
```

This architecture provides:
- Better security (backend URL not exposed to frontend)
- Centralized request handling
- Environment-specific backend configurations
- Server-side request processing
- Seamless integration with both FastAPI and RunAPI backends

## 🛠️ Development Tips

1. **Environment Variables**: Configure backend URL in `frontend/.env.local`
2. **CORS**: Backend includes CORS configuration for frontend
3. **Hot Reload**: Both frontend and backend support hot reloading
4. **Error Handling**: Comprehensive error handling throughout the stack
5. **TypeScript**: Full TypeScript support (if selected during setup)
6. **Backend Choice**:
   - **FastAPI**: Traditional routing, great for complex APIs
   - **RunAPI**: File-based routing, perfect for organized, scalable APIs
7. **Route Organization**: 
   - **FastAPI**: Routes defined in `app.py`
   - **RunAPI**: Routes organized in `routes/` folder structure

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   - Frontend (3000): Change port with `npm run dev -- -p 3001`
   - Backend (8000): Change port in `backend/app.py` or use `--port 8001`

2. **Python Virtual Environment Issues**:
   - Recreate venv: `python -m venv venv`
   - Ensure Python is in PATH

3. **Backend Framework Issues**:
   - **RunAPI not found**: Ensure `pip install runapi` was successful
   - **Routes not loading**: Check file naming in `routes/` folder
   - **FastAPI import errors**: Verify virtual environment activation

4. **Package Installation Errors**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

4. **CORS Errors**:
   - Check backend CORS configuration
   - Verify frontend URL in backend allowed origins

### Logs and Debugging

- **Frontend**: Check browser console and terminal
- **Backend**: Check terminal output where uvicorn is running
- **Network**: Use browser DevTools Network tab to inspect API calls

## 📦 Dependencies

### Frontend
- Next.js 15+
- React 18+
- Tailwind CSS (if selected)
- TypeScript (if selected)

### Backend
**FastAPI Projects:**
- FastAPI
- Uvicorn
- Python 3.8+

**RunAPI Projects:**
- RunAPI (includes FastAPI)
- Python 3.8+

### Development
- Concurrently (for running multiple processes)

## 🤝 Contributing

1. Make changes in respective directories (`frontend/` or `backend/`)
2. Test changes with `npm run dev`
3. Build for production with `npm run build`

## 📄 License

MIT License
