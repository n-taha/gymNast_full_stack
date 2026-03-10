import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer.jsx';
import Navbar from '../../components/layout/Navbar.jsx';
import { createClassBooking, listClasses, listSubscriptions } from '../../services/gymService';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingClassId, setBookingClassId] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await listClasses();
        setClasses(data);
      } catch (err) {
        setError('Failed to load classes from the backend.');
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // check subscriptions on mount so we can disable the button early
  useEffect(() => {
    const checkSubscriptions = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setHasActiveSubscription(false);
        return;
      }
      try {
        const allSubs = await listSubscriptions();
        const uid = Number(userId);
        const active =
          Array.isArray(allSubs) &&
          allSubs.some((s) => s.user === uid && s.is_active);
        setHasActiveSubscription(active);
      } catch (e) {
        setHasActiveSubscription(false);
      }
    };

    checkSubscriptions();
  }, []);

  const handleBook = async (fitnessClassId) => {
    const hasToken = !!localStorage.getItem('accessToken');
    if (!hasToken) {
      navigate('/auth/login');
      return;
    }
    try {
      setBookingMessage('');
      setBookingClassId(fitnessClassId);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/auth/login');
        return;
      }
      const allSubs = await listSubscriptions();
      const uid = Number(userId);
      const hasActive = Array.isArray(allSubs)
        ? allSubs.some((s) => s.user === uid && s.is_active)
        : false;
      if (!hasActive) {
        setBookingMessage('You need an active membership plan before booking classes.');
        return;
      }
      await createClassBooking(fitnessClassId);
      setBookingMessage('Class booked successfully! You can see it in your dashboard.');
    } catch (err) {
      // log full error for debugging
      console.error('class booking error', err);
      const status = err?.response?.status;
      const data = err?.response?.data;
      let backendMessage;
      if (status) {
        backendMessage = `Booking failed (${status})`;
        // try to display JSON if available
        if (data) {
          if (typeof data === 'string' && data.startsWith('<')) {
            // server returned HTML error page
            backendMessage += ': server error';
          } else {
            backendMessage += `: ${JSON.stringify(data)}`;
          }
        }
      } else {
        backendMessage = 'Booking failed. Make sure you have an active subscription.';
      }
      setBookingMessage(backendMessage);
    } finally {
      setBookingClassId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-base-200">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Classes</h1>
              <p className="text-base-content/70 text-sm">
                Live list of classes 
              </p>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center mt-8">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          )}

          {error && (
            <div className="alert alert-error max-w-xl mx-auto">
              <span>{error}</span>
            </div>
          )}

          {bookingMessage && !error && (
            <div className="alert alert-success max-w-xl mx-auto">
              <span>{bookingMessage}</span>
            </div>
          )}

          {/* warn user if they aren't eligible */}
          {!hasActiveSubscription && (
            <div className="alert alert-warning max-w-xl mx-auto">
              <span>You must have an active membership to book classes.</span>
            </div>
          )
          }

          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2">
              {classes.map((cls) => (
                <div key={cls.id} className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title text-lg">{cls.name}</h2>
                    <p className="text-sm text-base-content/80 mb-2">{cls.description}</p>
                    <div className="text-xs text-base-content/60 space-y-1">
                      <p>Schedule: {new Date(cls.schedule_date).toLocaleString()}</p>
                      <p>
                        Time: {new Date(cls.start_time).toLocaleTimeString()} -{' '}
                        {new Date(cls.end_time).toLocaleTimeString()}
                      </p>
                      <p>Capacity: {cls.capacity}</p>
                    </div>
                    <div className="card-actions mt-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleBook(cls.id)}
                        disabled={
                          bookingClassId === cls.id || !hasActiveSubscription
                        }
                      >
                        {bookingClassId === cls.id ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          'Book class'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {classes.length === 0 && (
                <p className="text-center text-base-content/70 col-span-full">
                  No classes found. Create classes from the admin dashboard.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClassesPage;

