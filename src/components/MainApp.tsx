import { useRouter } from "../contexts/RouterContext";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import ProjectsCarousel from "./ProjectsCarousel";
import Location from "./LocationImproved";
import Footer from "./Footer";
import FloatingSocialButton from "./FloatingSocialButton";
import ServiceDetailPage from "./ServiceDetailPage";
import ContactFormPage from "./ContactFormPage";
import AppointmentFormPage from "./AppointmentFormPage";
import { Smartphone, Globe, Share2 } from "lucide-react";
import InfiniteLogos from "./InfiniteLogos";

const MainApp = () => {
  const { currentPage } = useRouter();

  // Home page content
  const HomePage = () => (
    <>
      <Navbar />
      <main>
        <Hero />
        <InfiniteLogos />
        <About />
        <Services />
        <ProjectsCarousel />
        <Location />
      </main>
      <Footer />
      <FloatingSocialButton />
    </>
  );

  // Render based on current page
  const renderPage = () => {
    switch (currentPage) {
      case "service-1":
        return (
          <>
            <ServiceDetailPage
              serviceKey="service1"
              icon={Smartphone}
              bgGradient="from-blue-500 to-blue-600"
            />
            <FloatingSocialButton />
          </>
        );
      case "service-2":
        return (
          <>
            <ServiceDetailPage
              serviceKey="service2"
              icon={Globe}
              bgGradient="from-indigo-500 to-indigo-600"
            />
            <FloatingSocialButton />
          </>
        );
      case "service-3":
        return (
          <>
            <ServiceDetailPage
              serviceKey="service3"
              icon={Share2}
              bgGradient="from-purple-500 to-purple-600"
            />
            <FloatingSocialButton />
          </>
        );
      case "contact-form":
        return (
          <>
            <ContactFormPage />
            <FloatingSocialButton />
          </>
        );
      case "appointment-form":
        return (
          <>
            <AppointmentFormPage />
            <FloatingSocialButton />
          </>
        );
      case "home":
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
      <InfiniteLogos />
    </div>
  );
};

export default MainApp;
