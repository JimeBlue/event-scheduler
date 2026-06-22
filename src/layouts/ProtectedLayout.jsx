import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

// Route guard for logged-in-only pages (e.g. /events/new).
// Renders the child route if authenticated, otherwise redirects to /login —
// stashing the attempted location so the login form can send the user back here.
const ProtectedLayout = () => {
  // isAuthenticated is true whenever we hold a token.
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedLayout;
