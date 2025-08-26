# Python FastAPI Backend

A FastAPI backend server designed to work seamlessly with NextJS frontend through API routes.

## 🚀 Quick Start

### Using npm scripts (Recommended)

```bash
# Development with hot reload
npm run dev

# Production mode
npm run start

# Install Python dependencies
npm run install
```

### Manual Setup

```bash
# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Start production server
uvicorn app:app --host 0.0.0.0 --port 8000
```

## 📁 Project Structure

```
backend/
├── app.py              # FastAPI application
├── requirements.txt    # Python dependencies
├── package.json        # npm scripts for cross-platform execution
├── .env               # Environment variables
├── .gitignore         # Git ignore rules
└── venv/              # Python virtual environment
```

## 🔧 Configuration

### Environment Variables

Create or modify `.env` file:

```env
# Allowed frontend URLs for CORS
ALLOWED_URL=http://localhost:3000

# Database URL (if using database)
# DATABASE_URL=sqlite:///./app.db

# API Keys (if needed)
# API_KEY=your-secret-key
```

### CORS Settings

The backend is pre-configured with CORS settings for NextJS frontend:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("ALLOWED_URL", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📡 API Endpoints

### GET /
Returns a welcome message from the backend.

**Response:**
```json
{
  "message": "This is Get Request from python backend"
}
```

### POST /
Echoes back the sent data with a response message.

**Request Body:**
```json
{
  "data": "your data here"
}
```

**Response:**
```json
{
  "message": "This is Post Request from python backend and here is response {'data': 'your data here'}"
}
```

## 🛠️ Development

### Adding New Endpoints

1. Open `app.py`
2. Add your new endpoint:

```python
@app.get("/api/users")
def get_users():
    return {"users": ["user1", "user2"]}

@app.post("/api/users")
def create_user(user: dict):
    # Process user data
    return {"message": "User created", "user": user}
```

### Adding Database Support

1. Install additional dependencies:
```bash
pip install sqlalchemy psycopg2-binary  # for PostgreSQL
# or
pip install sqlalchemy  # for SQLite
```

2. Update `requirements.txt`:
```bash
pip freeze > requirements.txt
```

3. Add database models and connection in `app.py`

### Adding Authentication

1. Install dependencies:
```bash
pip install python-jose[cryptography] passlib[bcrypt] python-multipart
```

2. Add authentication endpoints and middleware

## 📦 Dependencies

Current dependencies in `requirements.txt`:

- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI applications
- **Python-multipart**: For handling form data and file uploads

### Adding New Dependencies

```bash
# Activate virtual environment first
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Install new package
pip install package-name

# Update requirements
pip freeze > requirements.txt
```

## 🔍 Testing

### Manual Testing

1. Start the server: `npm run dev`
2. Visit http://localhost:8000/docs for interactive API documentation (Swagger UI)
3. Visit http://localhost:8000/redoc for alternative documentation

### Adding Unit Tests

1. Install pytest:
```bash
pip install pytest pytest-asyncio httpx
```

2. Create `test_app.py`:
```python
import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_post_data():
    response = client.post("/", json={"data": "test"})
    assert response.status_code == 200
    assert "message" in response.json()
```

3. Run tests:
```bash
pytest
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process using port 8000
   # Windows:
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   
   # macOS/Linux:
   lsof -ti:8000 | xargs kill -9
   ```

2. **Virtual environment not found**:
   ```bash
   # Recreate virtual environment
   python -m venv venv
   # or
   python3 -m venv venv
   ```

3. **Import errors**:
   ```bash
   # Reinstall dependencies
   pip install -r requirements.txt
   ```

4. **CORS errors**:
   - Check `ALLOWED_URL` in `.env`
   - Verify frontend URL matches CORS settings

### Debug Mode

Enable debug logging by modifying `app.py`:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 🔒 Security Considerations

### Production Deployment

1. **Environment Variables**: Use environment variables for sensitive data
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Restrict CORS origins to your frontend domain
4. **Rate Limiting**: Consider adding rate limiting middleware
5. **Input Validation**: Validate all input data using Pydantic models

### Example Pydantic Model

```python
from pydantic import BaseModel

class UserData(BaseModel):
    name: str
    email: str
    age: int

@app.post("/api/users")
def create_user(user: UserData):
    return {"message": "User created", "user": user.dict()}
```

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html)

## 🤝 Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Write docstrings for new functions
4. Add tests for new features
5. Update requirements.txt when adding dependencies
