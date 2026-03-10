import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import { login, getCurrentUser } from '../../services/authService';

const UserLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(form);
      const user = await getCurrentUser();
      if (user.role === 'ADMIN' || user.role === 'STAFF') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <h2 className="card-title text-2xl mb-2">User Login</h2>
            {error && (
              <div className="alert alert-error text-sm">
                <span>{error}</span>
              </div>
            )}
            <label className="form-control">
              <span className="label-text">Email</span>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                required
                value={form.email}
                onChange={handleChange}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Password</span>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                required
                value={form.password}
                onChange={handleChange}
              />
            </label>
            <div className="card-actions mt-4">
              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner" /> : 'Login'}
              </button>
            </div>
            <p className="text-sm text-center mt-2">
              New here?{' '}
              <Link to="/auth/signup" className="link link-primary">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLoginPage;

