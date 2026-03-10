import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import { getCurrentUser, logout } from '../../services/authService';
import { getActiveSubscriptions, listClassBookings, listSubscriptions } from '../../services/gymService';

const UserOverview = ({ user, subscriptions }) => {
  return (
    <div className="space-y-4">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-lg">Welcome back, {user?.first_name || user?.email}</h2>
          <p className="text-sm text-base-content/70">
            Manage your memberships, classes and account settings here.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-sm">Active subscriptions</h3>
            {subscriptions.length === 0 && <p className="text-sm">No active subscriptions.</p>}
            {subscriptions.map((sub) => (
              <div key={sub.id} className="border border-base-200 rounded-lg p-3 mt-2">
                <p className="font-semibold">{sub.plan?.name}</p>
                <p className="text-xs text-base-content/70">
                  {sub.start_date} - {sub.end_date}
                </p>
                <p className="text-xs mt-1">
                  Status:{' '}
                  <span className={`badge badge-xs ${sub.is_active ? 'badge-success' : 'badge-ghost'}`}>
                    {sub.is_active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-sm">Notifications</h3>
            <p className="text-sm text-base-content/70">This is a placeholder for future notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfile = ({ user }) => {
  if (!user) return null;
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body space-y-2">
        <h2 className="card-title text-lg">Profile</h2>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Name:</span> {user.first_name} {user.last_name}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {user.address || '-'}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {user.phone_number || '-'}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role}
        </p>
      </div>
    </div>
  );
};

const UserSettings = () => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-lg">Settings</h2>
        <p className="text-sm text-base-content/70">
          Placeholder for password, email and notification preferences using the auth endpoints.
        </p>
      </div>
    </div>
  );
};

const UserClasses = ({ bookings }) => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-lg">My class bookings</h2>
        <p className="text-sm text-base-content/70 mb-3">
          These are your booked class
        </p>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fitness class</th>
                <th>Booked at</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.fitness_class}</td>
                  <td>{new Date(b.booked_at).toLocaleString()}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-sm">
                    You have not booked any classes yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UserSubscriptions = ({ user, allSubscriptions }) => {
  const mySubs = Array.isArray(allSubscriptions)
    ? allSubscriptions.filter((s) => s.user === user?.id)
    : [];

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-lg">My subscriptions</h2>
        <p className="text-sm text-base-content/70 mb-3">
          All of your subscriptions
        </p>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Plan</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mySubs.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.plan?.name}</td>
                  <td>{sub.plan?.duration}</td>
                  <td>
                    <span className={`badge badge-xs ${sub.is_active ? 'badge-success' : 'badge-ghost'}`}>
                      {sub.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
              {mySubs.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-sm">
                    You have not purchased any subscriptions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UserDashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // First, make sure user is authenticated
        const me = await getCurrentUser();
        if (!me) {
          navigate('/auth/login');
          return;
        }
        setUser(me);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          navigate('/auth/login');
          return;
        }
        setLoadError('Could not load your profile. Please try again later.');
      }

      // Load dashboard data, but don't block the whole page if some fail
      try {
        const [subs, allSubs, bks] = await Promise.all([
          getActiveSubscriptions().catch(() => []),
          listSubscriptions().catch(() => []),
          listClassBookings().catch(() => []),
        ]);
        setSubscriptions(Array.isArray(subs) ? subs : []);
        setAllSubscriptions(Array.isArray(allSubs) ? allSubs : []);
        setBookings(Array.isArray(bks) ? bks : []);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-base-200">
        <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-60">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-base mb-3">User Dashboard</h2>
                <ul className="menu menu-sm">
                  <li>
                    <NavLink to="" end>
                      Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/dashboard/profile"}>Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/dashboard/classes"}>My classes</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/dashboard/subscriptions"}>My plan</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/dashboard/settings"}>Settings</NavLink>
                  </li>
                </ul>
                <button className="btn btn-ghost btn-sm mt-4" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </aside>
          <section className="flex-1 space-y-4">
            {loadError && (
              <div className="alert alert-error">
                <span>{loadError}</span>
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            ) : (
              <Routes>
                <Route index element={<UserOverview user={user} subscriptions={subscriptions} />} />
                <Route path="profile" element={<UserProfile user={user} />} />
                <Route path="classes" element={<UserClasses bookings={bookings} />} />
                <Route
                  path="subscriptions"
                  element={<UserSubscriptions user={user} allSubscriptions={allSubscriptions} />}
                />
                <Route path="settings" element={<UserSettings />} />
                <Route path="*" element={<Navigate to="" replace />} />
              </Routes>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardLayout;

