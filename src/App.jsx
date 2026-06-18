import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import CreateEvent from './pages/CreateEvent';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      {/* Every page renders inside MainLayout (header + footer) */}
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events">
          <Route index element={<Events />} />
          <Route path=":id" element={<EventDetails />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />

        {/* Protected routes (guarded by ProtectedLayout) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/events/new" element={<CreateEvent />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
