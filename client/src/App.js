import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignUp, SignIn, Home, CreatePost } from './pages';
import { ProtectedRoute, Header, PostsList ,PostDetail} from './components';
import { AuthProvider } from './contexts/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const noHeaderRoutes = ['/signin', '/signup'];

  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <div>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/posts" element={<PostsList />} /> {/* Add the PostsList route */}
          <Route path="/posts/:id" element={<PostDetail />} /> {/* Add the PostDetail route */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create-post"
            element={<ProtectedRoute element={<CreatePost />} allowedRoles={['admin', 'editor']} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
