# NextJS Frontend

A modern NextJS application with TypeScript/JavaScript support, designed to communicate with a Python FastAPI backend through API routes.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── backend/
│   │   │       └── route.ts/js    # API route that forwards to Python backend
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx/jsx         # Root layout component
│   │   └── page.tsx/jsx           # Main page component
│   ├── components/
│   │   └── BackendDemo.tsx/jsx    # Demo component with API interactions
│   └── lib/
│       └── api.ts/js              # API utility functions
├── .env.local                     # Environment variables
├── next.config.js                 # NextJS configuration
├── tailwind.config.js             # Tailwind CSS configuration (if enabled)
├── package.json                   # Project dependencies and scripts
└── README.md                      # This file
```

## 🔧 Configuration

### Environment Variables

The `.env.local` file contains environment-specific configurations:

```env
# Backend URL - Change this if your Python backend runs on a different port
BACKEND_URL=http://localhost:8000

# NextJS specific variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### API Routes Configuration

The application uses NextJS API routes to communicate with the Python backend:

- **GET /api/backend**: Forwards GET requests to Python backend
- **POST /api/backend**: Forwards POST requests to Python backend

## 🌐 API Integration

### Frontend → NextJS API Routes → Python Backend

The application follows this architecture:

1. **Frontend components** make requests to NextJS API routes (`/api/backend`)
2. **NextJS API routes** forward requests to Python backend
3. **Python backend** processes requests and returns responses
4. **NextJS API routes** format and return responses to frontend

### Example Usage

```typescript
import { fetchFromBackend, sendToBackend } from '@/lib/api';

// GET request
const response = await fetchFromBackend();
if (response.success) {
  console.log(response.data.message);
}

// POST request
const postResponse = await sendToBackend({ data: 'Hello Backend!' });
if (postResponse.success) {
  console.log(postResponse.data.message);
}
```

## 🎨 Styling

### Tailwind CSS (if enabled)

The project includes Tailwind CSS for utility-first styling:

- **Responsive design**: Built-in responsive utilities
- **Dark mode**: Support for dark/light themes
- **Custom components**: Pre-built component styles

### Custom CSS

Global styles are defined in `src/app/globals.css`. You can add custom styles or override Tailwind defaults here.

## 🧩 Components

### BackendDemo Component

The main demo component (`src/components/BackendDemo.tsx/jsx`) demonstrates:

- **GET requests**: Fetching data from the backend
- **POST requests**: Sending data to the backend
- **Error handling**: Displaying error messages
- **Loading states**: Showing loading indicators
- **Response display**: Formatting and displaying backend responses

### Adding New Components

1. Create component file in `src/components/`:
```typescript
// src/components/MyComponent.tsx
'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState('');
  
  return (
    <div className="p-4">
      <h2>My Component</h2>
      {/* Component content */}
    </div>
  );
}
```

2. Import and use in pages:
```typescript
import MyComponent from '@/components/MyComponent';

export default function Page() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}
```

## 📡 API Utilities

### API Helper Functions

The `src/lib/api.ts/js` file provides utility functions:

```typescript
// Fetch data from backend
const response = await fetchFromBackend();

// Send data to backend
const response = await sendToBackend({ key: 'value' });

// Generic API call
const response = await apiCall('/api/custom-endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### Error Handling

All API functions include comprehensive error handling:

```typescript
try {
  const response = await fetchFromBackend();
  if (response.success) {
    // Handle success
    setData(response.data);
  } else {
    // Handle API error
    setError(response.error);
  }
} catch (error) {
  // Handle network/unexpected errors
  setError('Network error occurred');
}
```

## 🛠️ Development

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the application for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint for code quality
- `npm run type-check`: Run TypeScript type checking (TypeScript projects)

### Adding New Pages

1. Create page file in `src/app/`:
```typescript
// src/app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
    </div>
  );
}
```

2. Access at `/about`

### Adding New API Routes

1. Create route file in `src/app/api/`:
```typescript
// src/app/api/custom/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Custom API route' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

2. Access at `/api/custom`

## 🎯 Features

### Included Features

- ✅ **TypeScript/JavaScript Support**: Choose your preferred language
- ✅ **Tailwind CSS**: Utility-first CSS framework (optional)
- ✅ **API Routes**: Server-side API handling
- ✅ **Error Boundaries**: Graceful error handling
- ✅ **Hot Reload**: Instant development feedback
- ✅ **SEO Optimized**: Built-in SEO optimization
- ✅ **Responsive Design**: Mobile-first responsive layouts

### Demo Application Features

- 🔄 **Real-time Communication**: Live communication with Python backend
- 📝 **Form Handling**: Interactive forms with validation
- 🎨 **Modern UI**: Clean, modern interface design
- 📱 **Mobile Responsive**: Works on all device sizes
- ⚡ **Performance Optimized**: Fast loading and rendering

## 🔍 Testing

### Manual Testing

1. Start the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Test the backend communication features
4. Check browser console for any errors

### Adding Unit Tests

1. Install testing dependencies:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

2. Create test files:
```typescript
// src/components/__tests__/BackendDemo.test.tsx
import { render, screen } from '@testing-library/react';
import BackendDemo from '../BackendDemo';

test('renders backend demo component', () => {
  render(<BackendDemo />);
  expect(screen.getByText('NextJS ↔ Python Backend Demo')).toBeInTheDocument();
});
```

3. Run tests:
```bash
npm test
```

## 🚨 Troubleshooting

### Common Issues

1. **Build errors**:
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules package-lock.json
   npm install
   ```

2. **API connection errors**:
   - Check if backend is running on correct port
   - Verify `BACKEND_URL` in `.env.local`
   - Check browser network tab for CORS errors

3. **TypeScript errors**:
   ```bash
   # Run type checking
   npm run type-check
   
   # Fix missing types
   npm install --save-dev @types/node @types/react @types/react-dom
   ```

4. **Styling issues**:
   - Check Tailwind CSS configuration
   - Verify CSS imports in layout files
   - Clear browser cache

### Debug Mode

Enable debug logging in development:

```typescript
// Add to your component
useEffect(() => {
  console.log('Component state:', { data, loading, error });
}, [data, loading, error]);
```

## 📦 Dependencies

### Core Dependencies

- **Next.js**: React framework for production
- **React**: JavaScript library for building user interfaces
- **TypeScript** (if selected): Static type checking

### Optional Dependencies

- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing tool

### Adding New Dependencies

```bash
# Add runtime dependency
npm install package-name

# Add development dependency
npm install --save-dev package-name
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

- **Netlify**: Static site hosting
- **AWS**: S3 + CloudFront
- **Docker**: Containerized deployment

### Environment Variables for Production

```env
BACKEND_URL=https://your-backend-domain.com
NEXT_PUBLIC_API_URL=https://your-frontend-domain.com/api
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🤝 Contributing

1. Follow ESLint configuration for code style
2. Use TypeScript for type safety (if TypeScript project)
3. Write meaningful component and function names
4. Add comments for complex logic
5. Test components before committing
