import { Outlet } from 'react-router';
import Header from '../components/layout/Header';

// The outer shell shown on every page: header + page content + footer.
// TODO: the footer is still a placeholder; it'll be extracted into a
// dedicated <Footer /> component on a later branch.
const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <Header />

      {/* The matched child route renders here */}
      <main>
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
