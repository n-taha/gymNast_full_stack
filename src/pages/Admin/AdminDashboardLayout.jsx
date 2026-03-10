import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import { getCurrentUser, logout } from '../../services/authService';
import { listClasses, listMemberships, listSubscriptions } from '../../services/gymService';
import { apiClient } from '../../services/apiClient';

const AdminOverview = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <div className="stat bg-base-100 shadow-sm rounded-box">
        <div className="stat-title">Classes</div>
        <div className="stat-value text-primary">{stats.classes}</div>
        <div className="stat-desc">Total fitness classes</div>
      </div>
      <div className="stat bg-base-100 shadow-sm rounded-box">
        <div className="stat-title">Membership plans</div>
        <div className="stat-value text-secondary">{stats.memberships}</div>
        <div className="stat-desc">Available to members</div>
      </div>
      <div className="stat bg-base-100 shadow-sm rounded-box">
        <div className="stat-title">Subscriptions</div>
        <div className="stat-value text-accent">{stats.subscriptions}</div>
        <div className="stat-desc">Total purchased</div>
      </div>
    </div>
  );
};

const AdminUsers = ({ users }) => (
  <div className="card bg-base-100 shadow-sm">
    <div className="card-body">
      <h2 className="card-title text-lg">User management</h2>
      <p className="text-sm text-base-content/70 mb-3">
        Users from `/auth/users/`. You can extend this to edit or deactivate accounts.
      </p>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-sm">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AdminOrders = ({ subscriptions }) => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-lg">Subscriptions</h2>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Plan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.user}</td>
                  <td>{sub.plan?.name}</td>
                  <td>
                    <span className={`badge badge-xs ${sub.is_active ? 'badge-success' : 'badge-ghost'}`}>
                      {sub.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
              {subscriptions.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-sm">
                    No subscriptions yet.
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

const AdminNotifications = () => (
  <div className="card bg-base-100 shadow-sm">
    <div className="card-body">
      <h2 className="card-title text-lg">Notifications</h2>
      <p className="text-sm text-base-content/70">
        Placeholder area for system alerts (expiring subscriptions, fully booked classes, etc.).
      </p>
    </div>
  </div>
);

const AdminDashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const current = await getCurrentUser();
        if (current.role !== 'ADMIN' && current.role !== 'STAFF') {
          navigate('/admin/login');
          return;
        }
        setUser(current);
        const [cls, mem, subs, usersRes] = await Promise.all([
          listClasses(),
          listMemberships(),
          listSubscriptions(),
          apiClient.get('/auth/users/'),
        ]);
        setClasses(cls);
        setMemberships(mem);
        setSubscriptions(subs);
        setUsers(usersRes.data || []);
      } catch (err) {
        navigate('/admin/login');
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

  const stats = {
    classes: classes.length,
    memberships: memberships.length,
    subscriptions: subscriptions.length,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-base-200">
        <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-base mb-1">Admin Dashboard</h2>
                <p className="text-xs text-base-content/70 mb-3">
                  Signed in as {user?.email}
                </p>
                <ul className="menu menu-sm">
                  <li>
                    <NavLink to="" end>
                      Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/admin/users"}>Users</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/admin/orders"}>Subscriptions</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/admin/notifications"}>Notifications</NavLink>
                  </li>
                </ul>
                <button className="btn btn-ghost btn-sm mt-4" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </aside>
          <section className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            ) : (
              <Routes>
                <Route index element={<AdminOverview stats={stats} />} />
                <Route path="users" element={<AdminUsers users={users} />} />
                <Route path="orders" element={<AdminOrders subscriptions={subscriptions} />} />
                <Route path="notifications" element={<AdminNotifications />} />
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

export default AdminDashboardLayout;

