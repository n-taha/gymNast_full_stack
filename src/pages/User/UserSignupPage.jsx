import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import { registerUser } from '../../services/authService';

const UserSignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
  });
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
      await registerUser(form);
      navigate('/auth/login');
    } catch (err) {
      setError('Failed to create account. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-xl bg-base-100 shadow-xl">
          <form className="card-body grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="md:col-span-2 mb-1">
              <h2 className="card-title text-2xl">Create your account</h2>
            </div>
            {error && (
              <div className="alert alert-error text-sm md:col-span-2">
                <span>{error}</span>
              </div>
            )}
            <label className="form-control">
              <span className="label-text">First name</span>
              <input
                name="first_name"
                className="input input-bordered"
                value={form.first_name}
                onChange={handleChange}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Last name</span>
              <input
                name="last_name"
                className="input input-bordered"
                value={form.last_name}
                onChange={handleChange}
              />
            </label>
            <label className="form-control md:col-span-2">
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
            <label className="form-control md:col-span-2">
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
            <label className="form-control md:col-span-2">
              <span className="label-text">Address</span>
              <input
                name="address"
                className="input input-bordered"
                value={form.address}
                onChange={handleChange}
              />
            </label>
            <label className="form-control md:col-span-2">
              <span className="label-text">Phone number</span>
              <input
                name="phone_number"
                className="input input-bordered"
                value={form.phone_number}
                onChange={handleChange}
              />
            </label>
            <div className="card-actions md:col-span-2 mt-2">
              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? <span className="loading loading-spinner" /> : 'Sign up'}
              </button>
            </div>
            <p className="text-sm text-center md:col-span-2 mt-1">
              Already have an account?{' '}
              <Link to="/auth/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserSignupPage;

