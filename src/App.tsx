import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from './components/pages/Signup'
import { Signin } from './components/pages/Signin';
import { Home } from './components/pages/Home';
import { Profile } from './components/pages/Profile';
import { BlogPage } from './components/pages/BlogPage';
import { UserProvider } from './contexts/UserContext';
import { CreatePost } from './components/pages/CreatePost';
import { EditPost } from './components/pages/EditPost';

function App() {

  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/profile/:authorId" element={<Profile />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/blog/:id/edit" element={<EditPost />} />
            <Route path="/" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
