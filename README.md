![backtool](https://socialify.git.ci/Amanbig/create-nextpy-app/image?font=Source+Code+Pro&language=1&name=1&owner=1&pattern=Brick+Wall&theme=Dark)

# NextPy CLI

A powerful command-line tool for creating full-stack applications with NextJS frontend and Python backend. Choose between **FastAPI** for traditional routing or **RunAPI** for Next.js-inspired file-based routing.

## 🚀 Quick Start

```bash
# Using npx (recommended)
npx create-nextpy-app

# Or install globally
npm install -g create-next```bash
# Clone the repository
git clone https://github.com/Amanbig/create-nextpy-app.git
cd create-nextpy-app

# Install dependencies
npm install

# Test locally
npm link
create-nextpy-app --help
```te-nextpy-app
```

## ✨ Features

- 🎯 **Interactive Setup**: Guided project creation with prompts
- 📁 **Dual Backend Options**: 
  - **FastAPI**: Traditional routing with explicit route definitions
  - **RunAPI**: File-based routing inspired by Next.js (routes folder structure)
- 🌐 **Full-Stack Integration**: Complete NextJS + Python backend communication
- 🔄 **API Routes**: Pre-configured NextJS API routes that proxy to Python backend
- 🎨 **Styling Options**: Optional Tailwind CSS integration
- 💻 **Language Support**: JavaScript or TypeScript for frontend
- 🚀 **Development Ready**: Concurrent dev servers with npm scripts
- 📝 **Demo Included**: Simple GET request demo to test backend connectivity
- 📝 **Language Choice**: Support for both TypeScript and JavaScript
- 🔧 **Cross-Platform**: Works on Windows, macOS, and Linux
- 🐍 **Python Detection**: Automatically detects `python` or `python3` commands
- 📦 **Package Scripts**: Convenient npm scripts to run both frontend and backend
- 📚 **Documentation**: Comprehensive README files for each component
- 🎉 **Demo Components**: Sample components showing frontend-backend communication
- 🛡️ **Robust Error Handling**: Graceful handling of missing dependencies
- 🔄 **Git Integration**: Automatic git initialization with fallback handling
- 📋 **Smart Releases**: Automated publishing only when version changes

## 📋 Usage

### Interactive Mode (Recommended)

```bash
npx create-nextpy-app
```

The CLI will prompt you for:
- Project name
- Language choice (TypeScript or JavaScript)
- Tailwind CSS preference
- API framework choice (FastAPI or RunAPI)

### Command Line Options

```bash
npx create-nextpy-app [options]

Options:
  -p, --project <name>     Specify project name
  -l, --language <type>    Specify language (JavaScript, TypeScript)
  -t, --tailwind <type>    Specify whether to use tailwind (Yes, No)
  -r, --api <type>         Specify API framework (FastAPI, RunAPI)
  -f, --force             Force overwrite of existing files without prompting
  -h, --help              Display help for command
  -V, --version           Display version number
```

### Examples

```bash
# Create TypeScript project with Tailwind CSS and RunAPI
npx create-nextpy-app -p my-app -l TypeScript -t Yes -r RunAPI

# Create JavaScript project with FastAPI (traditional routing)
npx create-nextpy-app -p my-api -l JavaScript -t No -r FastAPI

# Quick setup with RunAPI (file-based routing like Next.js)
npx create-nextpy-app -p my-runapi-app -r RunAPI
npx create-nextpy-app --project my-app --language TypeScript --tailwind Yes

# Create JavaScript project without Tailwind CSS
npx create-nextpy-app -p simple-app -l JavaScript -t No

# Interactive mode (prompts for all options)
npx create-nextpy-app
```

## 📁 Generated Project Structure

```
my-project/
├── package.json              # Root package.json with convenient scripts
├── README.md                 # Project documentation
├── frontend/                 # NextJS application
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   └── backend/
│   │   │   │       └── route.ts/js    # API route to Python backend
│   │   │   ├── page.tsx/jsx           # Main page with demo
│   │   │   └── layout.tsx/jsx         # Root layout
│   │   ├── components/
│   │   │   └── BackendDemo.tsx/jsx    # Demo component
│   │   └── lib/
│   │       └── api.ts/js              # API utilities
│   ├── .env.local                     # Environment variables
│   ├── package.json                   # Frontend dependencies
│   └── README.md                      # Frontend documentation
└── backend/                           # Python backend (FastAPI or RunAPI)
    ├── app.py (FastAPI)              # FastAPI server
    │   OR                            
    ├── routes/ (RunAPI)              # RunAPI file-based routes
    │   ├── index.py                  # GET /
    │   └── api/                      # API routes
    ├── main.py (RunAPI)              # RunAPI app entry point
    ├── requirements.txt               # Python dependencies  
    ├── package.json                   # Cross-platform npm scripts
    ├── .env                           # Backend environment variables
    ├── .gitignore                     # Git ignore rules
    ├── venv/                          # Python virtual environment
    └── README.md                      # Backend documentation
```

## 🔄 Backend Architecture: FastAPI vs RunAPI

Choose the backend framework that best fits your development style:

### FastAPI (Traditional Routing)
Perfect for developers who prefer explicit route definitions and traditional API structures.

```python
# backend/app.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/users")
def get_users():
    return {"users": []}

@app.post("/api/users")
def create_user(user: dict):
    return {"created": user}
```

**FastAPI Benefits:**
- ✅ Explicit route definitions
- ✅ Mature ecosystem
- ✅ Extensive documentation
- ✅ Built-in OpenAPI/Swagger docs
- ✅ Great for complex API logic

### RunAPI (File-based Routing)
Perfect for developers who love Next.js and want the same intuitive file-based routing for APIs.

```
backend/
├── routes/
│   ├── index.py          # GET /
│   └── api/
│       ├── users.py      # GET,POST /api/users  
│       └── users/
│           └── [id].py   # GET,PUT,DELETE /api/users/{id}
└── main.py
```

```python
# backend/routes/index.py
from runapi import JSONResponse

async def get():
    return JSONResponse({"message": "Hello from RunAPI!"})

# backend/routes/api/users.py  
from runapi import JSONResponse, Request

async def get():
    return JSONResponse({"users": []})

async def post(request: Request):
    body = await request.json()
    return JSONResponse({"created": body})
```

**RunAPI Benefits:**
- ✅ File structure = API structure
- ✅ Next.js-inspired developer experience
- ✅ Dynamic routes with `[id].py` syntax
- ✅ Built on FastAPI (same performance)
- ✅ Perfect for developers familiar with Next.js

### When to Choose Which?

| Choose FastAPI | Choose RunAPI |
|----------------|---------------|
| Traditional API development | Next.js-style file routing |
| Complex route logic | Clean, organized structure |
| Team familiar with FastAPI | Team loves Next.js approach |
| Existing FastAPI codebase | New projects |
| Need maximum control | Want rapid development |

## 🎯 What Gets Created

### Frontend (NextJS)
- ⚡ **NextJS 15** with App Router
- 🎨 **Tailwind CSS** (optional)
- 📝 **TypeScript/JavaScript** support
- 🔄 **API Routes** that proxy to Python backend
- 🧩 **Demo Component** with simple GET request example
- 📱 **Responsive Design** with modern UI
- ⚠️ **Error Handling** with user feedback
- 🔧 **ESLint** configuration

### Backend (FastAPI or RunAPI)
- 🚀 **FastAPI**: Traditional routing with automatic OpenAPI docs
- 📁 **RunAPI**: File-based routing inspired by Next.js
- 🌐 **CORS** configured for NextJS frontend  
- 🐍 **Virtual Environment** automatically created
- 📦 **Dependencies** installed automatically
- 🔄 **Hot Reload** with development server
- 🔧 **Cross-Platform** npm scripts
- 📝 **Sample GET Endpoint** for testing connectivity

### Project Root
- 📦 **Convenient Scripts** to run both frontend and backend
- 📚 **Comprehensive Documentation**
- 🔧 **Cross-Platform Compatibility**
- 🎯 **Single Command Setup**

## 🚀 Generated npm Scripts

After creating a project, you can use these convenient scripts:

### Root Directory
```bash
# Run both frontend and backend together
npm run dev

# Run only frontend
npm run frontend

# Run only backend  
npm run backend

# Build frontend for production
npm run build

# Install all dependencies
npm run install:all
```

### Frontend Directory
```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

### Backend Directory
```bash
cd backend

# Development with hot reload
npm run dev              # Works for both FastAPI and RunAPI

# FastAPI: Traditional uvicorn server
npm start               # uvicorn app:app --host 0.0.0.0 --port 8000

# RunAPI: Built-in dev server with file watching
# (npm run dev automatically uses 'runapi dev' for RunAPI projects)

# Production server
npm run start

# Install Python dependencies
npm run install
```

## 🛠️ System Requirements

### Required
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Python** 3.8 or higher

### Optional
- **Git** (for version control - automatically initialized if available)

## 🌍 Cross-Platform Support

The CLI automatically detects your operating system and uses appropriate commands:

| Platform | Python Command | Virtual Environment | Package Manager |
|----------|---------------|-------------------|-----------------|
| **Windows** | `python` | `venv\Scripts\` | `pip` |
| **macOS** | `python3` | `venv/bin/` | `pip3` |
| **Linux** | `python3` | `venv/bin/` | `pip3` |

## 🎨 Architecture

The generated application follows this architecture pattern:

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   Frontend  │───▶│ NextJS API Routes│───▶│   Python Backend    │
│   (React)   │    │   (/api/backend) │    │ (FastAPI / RunAPI)  │
└─────────────┘    └──────────────────┘    └─────────────────────┘
```

### Benefits of This Architecture

1. **🔒 Security**: Frontend never directly exposes backend URLs
2. **🔧 Flexibility**: Add authentication, rate limiting, etc. in API routes
3. **📝 Type Safety**: Full TypeScript support throughout
4. **⚡ Performance**: Server-side request processing
5. **🌍 Environment Management**: Different backend URLs per environment

## 🚨 Troubleshooting

### Common Issues

#### 1. Python Not Found
```bash
Error: Python not found. Please install Python and ensure it's in your PATH.
```
**Solution**: Install Python from [python.org](https://python.org) and add to PATH

#### 2. Git Not Available
```bash
⚠️ Git not found or failed to initialize. You can initialize git manually later with: git init
```
**Solution**: This is not an error! The CLI continues without git and you can:
- Install Git from [git-scm.com](https://git-scm.com)
- Initialize git manually later: `cd your-project && git init`
- The project works perfectly without git

#### 3. Virtual Environment Creation Failed
```bash
Error: python -m venv venv
```
**Solutions**:
- Ensure Python is properly installed
- Try `python3 -m venv venv` manually
- Check Python version: `python --version`

#### 4. RunAPI Installation Failed
```bash
Error: Failed to install runapi
```
**Solutions**:
- Ensure Python virtual environment is activated
- Try manual installation: `pip install runapi`
- Check Python version compatibility (3.8+)

#### 5. RunAPI Init Command Failed
```bash
Error: runapi init command failed
```
**Solutions**:
- Ensure RunAPI is properly installed: `pip list | grep runapi`
- Try running manually: `python -m runapi init .`
- Check virtual environment is activated

#### 6. File-based Routes Not Loading (RunAPI)
**Symptoms**: Routes in `routes/` folder not accessible
**Solutions**:
- Ensure files follow naming convention: `index.py`, `users.py`, `[id].py`
- Check that functions are properly exported: `async def get():`
- Verify `main.py` exists and creates RunAPI app
- Restart the development server: `runapi dev`

#### 7. NextJS Creation Timeout
```bash
NextJS creation timed out.
```
**Solutions**:
- Check internet connection
- Clear npm cache: `npm cache clean --force`
- Try manual creation with provided command

#### 8. Port Already in Use
```bash
Error: Port 3000/8000 already in use
```
**Solutions**:
- Kill existing processes on those ports
- Change ports in configuration files

### Error Handling Features

The CLI includes robust error handling for common scenarios:

- **🐍 Python Detection**: Automatically tries `python` then `python3`
- **🔄 Git Graceful Fallback**: Continues without git if not available
- **⏱️ Timeout Management**: Handles slow network connections
- **🔧 Cross-Platform**: Adapts commands for your operating system
- **📝 Clear Messages**: Provides helpful error messages and solutions
- **🔧 Framework Detection**: Automatically configures for FastAPI or RunAPI
- **📁 File Structure Validation**: Ensures proper RunAPI route structure

### Getting Help

1. **Check the logs**: The CLI provides detailed error messages
2. **Manual setup**: Use the manual setup instructions if CLI fails
3. **Clear cache**: Clear npm cache and try again
4. **Check system requirements**: Ensure all requirements are met
5. **Framework-specific help**:
   - FastAPI: Check [FastAPI documentation](https://fastapi.tiangolo.com/)
   - RunAPI: Check [RunAPI repository](https://github.com/Amanbig/runapi)
6. **Test backend directly**: Visit `http://localhost:8000` to check if backend is running
7. **Test API routes**: Visit `http://localhost:3000/api/backend` to test NextJS → Python connection

## 🔧 Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/Amanbig/create-nextpy-app.git
cd create-nextpy-app

# Install dependencies
npm install

# Test locally
npm link
create-nextpy-app --help
```

### Release Workflow

The project includes an automated release workflow with smart version detection:

#### 🚀 Automated Publishing
- **Triggers**: Only when `package.json` version is changed on main branch
- **Publishes to**:
  - [npmjs.com](https://www.npmjs.com/package/create-nextpy-app)
  - [GitHub Packages](https://github.com/Amanbig/create-nextpy-app/packages)
- **Creates**: Automatic GitHub releases with changelogs

#### 📋 Release Process
1. Update version in `package.json`:
   ```bash
   npm version patch  # or minor, major
   ```
2. Push to main branch:
   ```bash
   git push && git push --tags
   ```
3. GitHub Actions automatically:
   - Detects version change
   - Builds and tests the package
   - Publishes to npm and GitHub Packages
   - Creates a GitHub release

#### 🛡️ Safety Features
- **Version Change Detection**: Only publishes when version actually changes
- **Dual Publishing**: Available on both npm and GitHub Packages
- **Dynamic Scoping**: Automatically creates scoped packages for GitHub
- **Release Notes**: Auto-generated with installation instructions

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 Documentation

Each generated project includes comprehensive documentation:

- **Project README**: Overview and quick start guide
- **Frontend README**: NextJS-specific documentation  
- **Backend README**: Framework-specific documentation
  - **FastAPI**: Traditional API development with OpenAPI docs
  - **RunAPI**: File-based routing guide with examples
- **API Documentation**: Auto-generated docs
  - **FastAPI**: Swagger UI at `/docs` and ReDoc at `/redoc`
  - **RunAPI**: Built-in documentation with route discovery

## 🎯 Use Cases

### Perfect For
- 🚀 **Rapid Prototyping**: Quickly create full-stack prototypes
- 📚 **Learning Projects**: Learn NextJS + Python integration
- 🏢 **Startup MVPs**: Fast MVP development with file-based routing
- 🎓 **Educational**: Teaching full-stack development
- 🔬 **Experimentation**: Try new ideas quickly
- 🎯 **Next.js Developers**: Familiar file-based routing for APIs

### Example Projects
- **Data Dashboards**: Frontend visualization with Python data processing
- **API Wrappers**: NextJS frontend for existing Python APIs
- **Machine Learning Apps**: ML models in Python with React frontend
- **CRUD Applications**: Database operations with modern UI
- **Microservices**: RunAPI for clean, organized API structure
- **E-commerce APIs**: File-based routes for products, users, orders

## 🔮 Roadmap

### Core Features
- [ ] Database integration options (PostgreSQL, MongoDB)
- [ ] Authentication templates (JWT, OAuth)
- [ ] Deployment configurations (Docker, Vercel, AWS)
- [ ] Testing setup (Jest, Pytest)
- [ ] CI/CD pipeline templates
- [ ] Additional frontend frameworks (Vue, Svelte)

### RunAPI Enhancements
- [ ] WebSocket support for real-time features
- [ ] Middleware templates (rate limiting, caching)
- [ ] Dynamic route templates with advanced patterns
- [ ] RunAPI plugin system integration
- [ ] Background task examples with RunAPI
- [ ] Database ORM integration examples

### FastAPI Enhancements  
- [ ] Advanced FastAPI templates with dependencies
- [ ] FastAPI middleware examples
- [ ] Custom response models and validation
- [ ] FastAPI background tasks integration

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## 📞 Support

- 📧 **Email**: [amanpreetsinghjhiwant7@gmail.com]
- 🐛 **Issues**: [GitHub Issues](https://github.com/Amanbig/create-nextpy-app/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Amanbig/create-nextpy-app/discussions)

---

**Made with ❤️ for developers who want to build full-stack applications quickly and efficiently.**
