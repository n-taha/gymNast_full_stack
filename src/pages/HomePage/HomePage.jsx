import Navbar from '../../components/layout/Navbar.jsx';
import HeroSection from '../../components/home/HeroSection.jsx';
import FeaturesSection from '../../components/home/FeaturesSection.jsx';
import TestimonialsSection from '../../components/home/TestimonialsSection.jsx';
import PricingSection from '../../components/home/PricingSection.jsx';
import CTASection from '../../components/home/CTASection.jsx';
import Footer from '../../components/layout/Footer.jsx';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

