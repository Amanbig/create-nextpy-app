![backtool](https://socialify.git.ci/Amanbig/create-nextpy-app/image?font=Source+Code+Pro&language=1&name=1&owner=1&pattern=Brick+Wall&theme=Dark)

# NextPy CLI

A powerful command-line tool for creating full-stack applications with NextJS frontend and Python FastAPI backend.

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
- 🌐 **Full-Stack**: Complete NextJS + Python FastAPI integration
- 🔄 **API Routes**: Pre-configured NextJS API routes that communicate with Python backend
- 🎨 **Styling Options**: Optional Tailwind CSS integration
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

### Command Line Options

```bash
npx create-nextpy-app [options]

Options:
  -p, --project <name>     Specify project name
  -l, --language <type>    Specify language (JavaScript, TypeScript)
  -t, --tailwind <type>    Specify whether to use tailwind (Yes, No)
  -f, --force             Force overwrite of existing files without prompting
  -h, --help              Display help for command
  -V, --version           Display version number
```

### Examples

```bash
# Create TypeScript project with Tailwind CSS
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
└── backend/                           # Python FastAPI application
    ├── app.py                         # FastAPI server
    ├── requirements.txt               # Python dependencies
    ├── package.json                   # Cross-platform npm scripts
    ├── .env                           # Backend environment variables
    ├── .gitignore                     # Git ignore rules
    ├── venv/                          # Python virtual environment
    └── README.md                      # Backend documentation
```

## 🎯 What Gets Created

### Frontend (NextJS)
- ⚡ **NextJS 15** with App Router
- 🎨 **Tailwind CSS** (optional)
- 📝 **TypeScript/JavaScript** support
- 🔄 **API Routes** that forward to Python backend
- 🧩 **Demo Components** showing GET/POST requests
- 📱 **Responsive Design** with modern UI
- ⚠️ **Error Handling** with user feedback
- 🔧 **ESLint** configuration

### Backend (Python FastAPI)
- 🚀 **FastAPI** with automatic OpenAPI docs
- 🌐 **CORS** configured for NextJS frontend
- 🐍 **Virtual Environment** automatically created
- 📦 **Dependencies** installed automatically
- 🔄 **Hot Reload** with uvicorn
- 🔧 **Cross-Platform** npm scripts
- 📝 **Sample Endpoints** (GET and POST)

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
npm run dev

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
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend  │───▶│ NextJS API Routes│───▶│ Python Backend  │
│   (React)   │    │   (/api/backend) │    │   (FastAPI)     │
└─────────────┘    └──────────────────┘    └─────────────────┘
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

#### 4. NextJS Creation Timeout
```bash
NextJS creation timed out.
```
**Solutions**:
- Check internet connection
- Clear npm cache: `npm cache clean --force`
- Try manual creation with provided command

#### 5. Port Already in Use
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

### Getting Help

1. **Check the logs**: The CLI provides detailed error messages
2. **Manual setup**: Use the manual setup instructions if CLI fails
3. **Clear cache**: Clear npm cache and try again
4. **Check system requirements**: Ensure all requirements are met

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
- **Backend README**: Python FastAPI documentation
- **API Documentation**: Auto-generated OpenAPI docs at `/docs`

## 🎯 Use Cases

### Perfect For
- 🚀 **Rapid Prototyping**: Quickly create full-stack prototypes
- 📚 **Learning Projects**: Learn NextJS + Python integration
- 🏢 **Startup MVPs**: Fast MVP development
- 🎓 **Educational**: Teaching full-stack development
- 🔬 **Experimentation**: Try new ideas quickly

### Example Projects
- **Data Dashboards**: Frontend visualization with Python data processing
- **API Wrappers**: NextJS frontend for existing Python APIs
- **Machine Learning Apps**: ML models in Python with React frontend
- **CRUD Applications**: Database operations with modern UI

## 🔮 Roadmap

- [ ] Database integration options (PostgreSQL, MongoDB)
- [ ] Authentication templates (JWT, OAuth)
- [ ] Deployment configurations (Docker, Vercel, AWS)
- [ ] Testing setup (Jest, Pytest)
- [ ] CI/CD pipeline templates
- [ ] Additional frontend frameworks (Vue, Svelte)

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
