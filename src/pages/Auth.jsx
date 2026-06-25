import { useState } from 'react';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';

// Single auth page with two tabs. Used for both /login and /signup — the route
// just picks which tab opens first (see App.jsx). The form logic still lives in
// <SignInForm /> and <SignUpForm />; this page only switches between them.
const Auth = ({ defaultTab = 'signin' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const isSignIn = activeTab === 'signin';

  return (
    <div className="bg-brand-blue-dark px-6 py-12 sm:px-12 sm:py-24 lg:px-0">
      <div className="container max-w-2xl rounded-lg bg-base-100 py-12">
        <div role="tablist" className="tabs tabs-box w-fit">
          <button
            type="button"
            role="tab"
            className={`tab ${isSignIn ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            className={`tab ${isSignIn ? '' : 'tab-active'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {isSignIn ? (
          <>
            <h1 className="mt-8 font-heading text-5xl font-medium">Sign In</h1>
            <p className="mt-4 font-text text-base-content">
              Welcome back — sign in to create events.
            </p>
            <SignInForm />
          </>
        ) : (
          <>
            <h1 className="mt-8 font-heading text-5xl font-medium">Sign Up</h1>
            <p className="mt-4 font-text text-base-content">
              Create an account to start scheduling events.
            </p>
            {/* Signup returns no token, so on success we just flip to the
                Sign In tab instead of navigating away. */}
            <SignUpForm onSuccess={() => setActiveTab('signin')} />
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
