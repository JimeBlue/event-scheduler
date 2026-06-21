import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

  // read the token from localStorage once, on the
  // first render. This persists the session across reloads 

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // The user object. Null until I fetch the profile.
  const [user, setUser] = useState(null);

  // Derived value: authenticated if I hold a token. No separate
  // boolean state to keep in sync — the token is the single source of truth.
  const isAuthenticated = Boolean(token);

  // On mount (and whenever the token changes), if I have a token, ask the
  // API who you are so the UI can greet the user after a reload.
  // If the token is stale/invalid the request 403s — we treat that as logged out.
  useEffect(() => {
    if (!token) return;

    const loadProfile = async () => {
      try {
        const profile = await api.get('/auth/profile');
        setUser(profile);
      } catch {
        // Token no longer valid — clear it so the app falls back to logged out.
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    };

    loadProfile();
  }, [token]);

  // Sign in: swap email + password for a token, then persist it.
  // api.js auto-attaches this token to every later request (FR018).
  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  // Sign up: create the account. The API returns the new user but NO token,
  // so this does NOT log the user in — the SignUp page redirects to /login.
  const signup = async (email, password) => {
    return api.post('/users', { email, password });
  };

  // Log out: drop the token everywhere so the guard and navbar update.
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
