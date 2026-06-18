import { Outlet, Navigate } from 'react-router';

// Route guard for logged-in-only pages (e.g. /events/new).
// Renders the child route if authenticated, otherwise redirects to /login.
const ProtectedLayout = () => {
  // TODO: replace with `const { isAuthenticated } = useAuth();`
  // once AuthContext exists. Hardcoded false for now.
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
