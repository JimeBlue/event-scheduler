import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FiChevronDown, FiMenu, FiPlus, FiUser, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

// The two primary nav links, defined once and reused in the desktop center
// menu and the mobile slide-over so the two can't drift apart.
const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/events', label: 'All Events' },
];

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Mobile slide-over open/closed state. Kept here so the whole thing stays
  // self-contained in the Header.
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // "Create event" gates on auth: logged-in users go straight to the form,
  // everyone else is sent to log in first — carrying the intended destination
  // so the login form can forward them on afterwards.
  const createEventTo = isAuthenticated ? '/events/new' : '/login';
  const createEventState = isAuthenticated
    ? undefined
    : { from: { pathname: '/events/new' } };

  // While the slide-over is open: close on Escape and lock background scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Drop the token, then send the user back home so they never linger on a
  // page they can no longer access.
  const handleLogout = () => {
    closeMenu();
    logout();
    navigate('/');
  };

  // The logged-in account actions, shared by the desktop dropdown and the
  // mobile slide-over.
  const accountMenuItems = (
    <>
      <li>
        <Link to="/events/new">Create event</Link>
      </li>
      <li>
        {/* TODO: route not built yet — placeholder for now. */}
        <button type="button">My events</button>
      </li>
      <li>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  );

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar container">
        {/* LEFT: logo */}
        <div className="navbar-start">
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

        {/* RIGHT: desktop auth area + mobile hamburger */}
        <div className="navbar-end">
          {/* Desktop CTA + auth (hidden on mobile) */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link to={createEventTo} state={createEventState} className="btn btn-primary gap-2">
              <FiPlus className="h-4 w-4" />
              Create event
            </Link>
            {isAuthenticated ? (
              // Logged in: user icon + email, opening a dropdown of account actions.
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
                  <FiUser className="h-5 w-5" />
                  <span>{user?.email}</span>
                  <FiChevronDown className="h-4 w-4" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                >
                  {accountMenuItems}
                </ul>
              </div>
            ) : (
              // Logged out: single control that opens the login page (tabbed).
              <Link to="/login" className="btn btn-ghost gap-2">
                <FiUser className="h-5 w-5" />
                <span>Sign in / Sign up</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger (hidden on desktop) — opens the slide-over */}
          <button
            type="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OVER (below lg). Self-contained: a fixed panel that
          slides in from the right with a dimmed backdrop, toggled by state. */}

      {/* Backdrop — click to close. Fades in/out and ignores clicks when shut. */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Panel — slides in from the right (translate-x). */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[80%] flex-col bg-base-100 shadow-xl transition-transform duration-300 lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between border-b border-base-300 p-4">
          <span className="font-heading text-xl text-brand-blue">Menu</span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Any click inside the menu closes the slide-over (then navigates). */}
        <ul className="menu w-full gap-1 p-4 font-text" onClick={closeMenu}>
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end}>
                {label}
              </NavLink>
            </li>
          ))}

          <div className="divider my-2" />

          {isAuthenticated ? (
            <>
              <li className="menu-title flex-row items-center gap-2">
                <FiUser className="h-5 w-5" />
                <span className="flex-1">{user?.email}</span>
                <FiChevronDown className="h-4 w-4" />
              </li>
              {accountMenuItems}
            </>
          ) : (
            <li>
              <Link to="/login">
                <FiUser className="h-5 w-5" />
                Sign in / Sign up
              </Link>
            </li>
          )}
        </ul>

        {/* Create event CTA, below the auth section */}
        <div className="px-4 pb-4">
          <Link
            to={createEventTo}
            state={createEventState}
            onClick={closeMenu}
            className="btn btn-primary w-full gap-2"
          >
            <FiPlus className="h-4 w-4" />
            Create event
          </Link>
        </div>
      </aside>
    </header>
  );
};

export default Header;
