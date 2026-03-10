import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-base-200">
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
          <h1 className="text-3xl font-bold mb-2">About Our Gym</h1>
          <p className="text-base-content/80">
            Our gym is a modern fitness center designed to help you stay
            healthy, active, and motivated. We provide a welcoming environment
            for everyone, whether you're a beginner or an experienced athlete.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg">For gym members</h2>
                <p className="text-sm text-base-content/80">
                  Our members get access to state-of-the-art equipment, expert
                  trainers, and personalized workout plans to help achieve their
                  fitness goals efficiently.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg">Classes & Programs</h2>
                <p className="text-sm text-base-content/80">
                  We offer a variety of group classes including yoga, HIIT,
                  strength training, and more. Our programs are designed for all
                  fitness levels and aim to make workouts enjoyable and
                  effective.
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg">Our Vision</h2>
              <p className="text-sm text-base-content/80">
                We aim to create a supportive fitness community where every
                individual can improve their health, build confidence, and lead
                a more active lifestyle.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
