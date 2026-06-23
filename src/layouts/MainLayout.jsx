import { Outlet } from 'react-router';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Toast from '../components/ui/Toast';

// The outer shell shown on every page: header + page content + footer.
const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <Header />

      {/* The matched child route renders here */}
      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Global toast outlet — shows transient confirmations (e.g. event added). */}
      <Toast />
    </div>
  );
};

export default MainLayout;
