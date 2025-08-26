# NextPython Full-Stack Project

A full-stack application combining NextJS frontend with Python FastAPI backend.

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
│   │   │   └── page.tsx  # Main page
│   │   ├── components/   # React components
│   │   └── lib/          # Utility functions
│   └── package.json
└── backend/              # Python FastAPI application
    ├── app.py            # FastAPI server
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
| `npm run dev` | Start backend with hot reload |
| `npm run start` | Start backend in production mode |
| `npm run install` | Install Python dependencies |

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
   uvicorn app:app --reload
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

The project includes NextJS API routes that forward requests to the Python backend:

- **GET /api/backend** - Forwards to Python backend GET endpoint
- **POST /api/backend** - Forwards to Python backend POST endpoint

## 🔄 Data Flow

```
Frontend → NextJS API Routes → Python Backend → NextJS API Routes → Frontend
```

This architecture provides:
- Better security (backend URL not exposed to frontend)
- Centralized request handling
- Environment-specific backend configurations
- Server-side request processing

## 🛠️ Development Tips

1. **Environment Variables**: Configure backend URL in `frontend/.env.local`
2. **CORS**: Backend includes CORS configuration for frontend
3. **Hot Reload**: Both frontend and backend support hot reloading
4. **Error Handling**: Comprehensive error handling throughout the stack
5. **TypeScript**: Full TypeScript support (if selected during setup)

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   - Frontend (3000): Change port with `npm run dev -- -p 3001`
   - Backend (8000): Change port in `backend/app.py` or use `--port 8001`

2. **Python Virtual Environment Issues**:
   - Recreate venv: `python -m venv venv`
   - Ensure Python is in PATH

3. **Package Installation Errors**:
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
- Next.js 14+
- React 18+
- Tailwind CSS (if selected)
- TypeScript (if selected)

### Backend
- FastAPI
- Uvicorn
- Python 3.8+

### Development
- Concurrently (for running multiple processes)

## 🤝 Contributing

1. Make changes in respective directories (`frontend/` or `backend/`)
2. Test changes with `npm run dev`
3. Build for production with `npm run build`

## 📄 License

MIT License
