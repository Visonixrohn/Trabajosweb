import { useState, useEffect } from "react";
import { useRouter } from "../contexts/RouterContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Globe, Menu, X } from "lucide-react";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currentPage, navigateTo } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== "home") {
      navigateTo("home");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img src="/logo.png" alt="VISONIXRO" className="relative h-10 w-auto" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-display tracking-wide">
              VISONIXRO
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "hero", label: t.nav.home },
              { id: "about", label: t.nav.about },
              { id: "services", label: t.nav.services },
              { id: "projects-carousel", label: t.nav.projects },
              { id: "contact", label: t.nav.contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 font-medium text-sm uppercase tracking-wider relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-200"
            >
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-gray-200 font-medium text-sm">
                {language === "es" ? "EN" : "ES"}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-gray-200 font-medium text-sm">
                {language === "es" ? "EN" : "ES"}
              </span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl">
            {[
              { id: "hero", label: t.nav.home },
              { id: "about", label: t.nav.about },
              { id: "services", label: t.nav.services },
              { id: "projects-carousel", label: t.nav.projects },
              { id: "contact", label: t.nav.contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
