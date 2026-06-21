import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

// Route guard for logged-in-only pages (e.g. /events/new).
// Renders the child route if authenticated, otherwise redirects to /login.
const ProtectedLayout = () => {
  // isAuthenticated is true whenever we hold a token.
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
