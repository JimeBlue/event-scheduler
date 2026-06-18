import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events">
        <Route index element={<Events />} />
        <Route path=":id" element={<EventDetails />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
