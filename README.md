# PenCraft Frontend

A modern blog platform frontend built with React and TypeScript, featuring rich text editing, user authentication, and responsive design.

## Features

- **Rich Text Editor**: Create and edit blog posts with formatting options using Jodit Editor
- **User Authentication**: Sign up, sign in, and guest access functionality
- **Blog Management**: View, create, edit, and delete blog posts
- **User Profiles**: View author profiles and their published posts
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Content Filtering**: Filter blogs by different criteria
- **Real-time Updates**: Dynamic content loading and state management

## Tech Stack

- **React 19** - Frontend framework with latest features
- **TypeScript 5.8** - Type safety and better developer experience
- **Vite 6** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework with latest features
- **React Router 7** - Client-side routing
- **Axios** - HTTP client for API requests
- **Jodit React** - Rich text editor component
- **DOMPurify** - HTML sanitization for security

## Prerequisites

Before running this project, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- Backend server running (Cloudflare Workers with Hono)

## Installation

1. Clone the repository and navigate to the frontend folder:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure your API base URL:
```env
VITE_API_BASE_URL=your-backend-url
```

## Available Scripts

- **Development server**:
```bash
npm run dev
```
Starts the development server at `http://localhost:5173`

- **Build for production**:
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

- **Preview production build**:
```bash
npm run preview
```
Serves the production build locally for testing

- **Type checking**:
```bash
npm run type-check
```
*Note: This project uses TypeScript compilation during build. Use `npm run build` to check for type errors.*

- **Linting**:
```bash
npm run lint
```
Runs ESLint to check code quality

## Key Components

### Pages
- **Home**: Main blog feed with filtering and view toggle options
- **BlogPage**: Individual blog post view with editing/deletion for authors
- **Signin/Signup**: Authentication pages with guest access option
- **CreatePost/EditPost**: Blog creation and editing with rich text editor
- **Profile**: User profile page showing all posts by an author

### Common Components
- **BlogCard**: Reusable blog post preview component
- **PostForm**: Shared form component for creating and editing posts
- **Topbar**: Navigation header with user menu
- **Avatar**: User profile picture component
- **Spinner**: Loading indicator component

## Authentication

The app supports three user types:
- **Registered users**: Full access to create, edit, and delete posts
- **Guest users**: Read-only access to view blogs
- **Authenticated state**: Managed through UserContext with JWT tokens

## Styling

The project uses Tailwind CSS for styling with:
- Responsive design patterns
- Custom color schemes
- Hover and active states
- Mobile-first approach

## API Integration

The frontend communicates with a Cloudflare Workers backend through:
- RESTful API endpoints
- JWT authentication
- Error handling with user-friendly messages
- Loading states for better UX

## Security Features

- **XSS Protection**: HTML sanitization using DOMPurify
- **Authentication**: JWT token-based authentication
- **Input Validation**: Client-side validation for forms
- **HTTPS**: Secure communication with backend

## Development

### Adding New Components
1. Create component in appropriate folder (`pages/` or `common/`)
2. Export from component file
3. Add routing if it's a page component
4. Update types in `assets/types.ts` if needed

### State Management
- User authentication state is managed through `UserContext`
- Local component state using React hooks
- Form state management with controlled components

## Build and Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains the production-ready files
3. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)
4. Ensure environment variables are configured in your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License

Copyright (c) 2025 PenCraft

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Support

For support, please open an issue in the repository or contact the development team.