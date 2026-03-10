import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const hasToken = !!localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');
  const isAdmin = role === 'ADMIN' || role === 'STAFF';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-30">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-extrabold tracking-tight">
          Gym<span className="text-primary">Nast</span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/classes">Classes</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          {!hasToken && (
            <li>
              <NavLink to="/auth/login">Login</NavLink>
            </li>
          )}
          {hasToken && (
            <>
              <li>
                <NavLink to={isAdmin ? '/admin' : '/dashboard'}>Dashboard</NavLink>
              </li>
              <li>
                <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes">Classes</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {!hasToken && (
              <li>
                <NavLink to="/auth/login">Login</NavLink>
              </li>
            )}
            {hasToken && (
              <>
                <li>
                  <NavLink to={isAdmin ? '/admin' : '/dashboard'}>Dashboard</NavLink>
                </li>
                <li>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

