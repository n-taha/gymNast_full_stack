const testimonials = [
  {
    name: 'Sarah, Gym Owner',
    quote: 'GymNast simplified our operations and our members love the new portal.',
  },
  {
    name: 'Leo, Trainer',
    quote: 'Class scheduling and attendance tracking are finally painless.',
  },
  {
    name: 'Mia, Member',
    quote: 'The online dashboard makes it easy to manage my membership and classes.',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Loved by gyms and members</h2>
          <p className="text-base-content/70">
            Real stories from teams that use GymNast every day.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <p className="text-sm mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-primary">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

