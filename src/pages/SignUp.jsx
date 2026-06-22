import { Link } from 'react-router';
import SignUpForm from '../components/auth/SignUpForm';

// Thin page shell: heading + the form + the link to sign in.
// All the form logic lives in <SignUpForm />.
const SignUp = () => {
  return (
    <div className='bg-brand-blue-dark py-12 sm:py-24 px-6 sm:px-12 lg:px-0'>
      <div className="container max-w-2xl py-12 bg-base-100 rounded-lg">
        <h1 className="font-heading text-5xl font-medium">Sign Up</h1>
        <p className="mt-4 font-text text-base-content">
          Create an account to start scheduling events.
        </p>
        <SignUpForm />
        <p className="mt-6 font-text text-base">
          Already have an account?{' '}
          <Link to="/login" className="link text-brand-blue-dark hover:opacity-70">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
