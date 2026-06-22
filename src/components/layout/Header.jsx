import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

// The two primary nav links, defined once and reused in both the mobile
// dropdown and the centered desktop menu so they can't drift apart.
const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/events', label: 'All Events' },
];

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Drop the token, then send the user back home so they never linger on a
  // page they can no longer access.
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar container">
        {/* LEFT: hamburger (mobile only) + logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {navLinks.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/" className="font-heading text-2xl text-brand-blue">
            EventBox
          </Link>
        </div>

        {/* CENTER: primary nav, desktop only */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 font-text">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: auth toggle */}
        <div className="navbar-end gap-2">
          {isAuthenticated ? (
            <button type="button" onClick={handleLogout} className="btn btn-ghost">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
