import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-primary-content">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Ready to modernize your gym?</h2>
          <p className="opacity-90">
            Start with a free account for your team and invite members in seconds.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/auth/signup" className="btn bg-base-100 text-base-content border-0">
            Get started
          </Link>
          <Link to="/auth/login" className="btn btn-outline btn-primary-content">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

