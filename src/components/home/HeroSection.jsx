import hero from '../../assets/Images/hero.jpg'

const HeroSection = () => {
  return (
    <section className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="lg:w-1/2">
          <img
            src={hero}
            alt="Gym training"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Be a Pro <span className="text-primary">GymNast</span> <br /> Join With Us
          </h1>
          <p className="py-2 text-base-content/80">
            GymNast is a modern gym management platform for owners, trainers and members. Track memberships,
            classes and subscriptions in one intuitive dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#pricing" className="btn btn-primary">
              View Plans
            </a>
            <a href="#features" className="btn btn-outline">
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

