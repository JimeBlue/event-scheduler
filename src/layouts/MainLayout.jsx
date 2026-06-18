import { Outlet, Link } from 'react-router';

// The outer shell shown on every page: header + page content + footer.
// TODO:  The header/footer are placeholders for now; they'll be extracted into
// dedicated <Navbar /> and <Footer /> components on a later branch.
const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: replace with <Navbar /> (reads useAuth() for Login/Logout) */}
      <header className="border-b">
        <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <Link to="/" className="font-heading text-2xl text-brand-blue">
            EventBox
          </Link>
        </nav>
      </header>

      {/* The matched child route renders here */}
      <main className="mx-auto w-full max-w-5xl flex-1 p-4">
        <Outlet />
      </main>

      {/* TODO: replace with <Footer /> */}
      <footer className="border-t">
        <div className="mx-auto max-w-5xl p-4 font-text text-sm">
          © {new Date().getFullYear()} EventBox
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
