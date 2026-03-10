const features = [
  {
    title: 'Smart Memberships',
    description: 'Create, update and track all membership plans with flexible pricing and durations.',
    icon: '💳',
  },
  {
    title: 'Class Scheduling',
    description: 'Manage classes, instructors and bookings in real-time from a single dashboard.',
    icon: '📅',
  },
  {
    title: 'Powerful Analytics',
    description: 'Understand revenue, active members and attendance trends at a glance.',
    icon: '📊',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Systems</h2>
          <p className="text-base-content/70">We Provide Whatever you need</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-sm text-base-content/80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

