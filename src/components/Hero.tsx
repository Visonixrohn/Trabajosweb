import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { ChevronDown, Eye, Zap, Cpu } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();
  useScrollAnimations();

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white bg-[size:50px_50px]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse animate-float" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-1000 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-500/15 rounded-full blur-xl animate-pulse delay-2000 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-blue-600/10 rounded-full blur-2xl animate-pulse delay-500 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-500/15 rounded-full blur-lg animate-pulse animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 right-10 w-36 h-36 bg-cyan-400/10 rounded-full blur-xl animate-pulse animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center pt-16">
          {/* Logo Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="relative group">
                <img 
                  src="/logo.png" 
                  alt="VISONIXRO" 
                  className="h-24 w-auto sm:h-32 filter drop-shadow-2xl animate-float group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 rounded-full blur-lg animate-pulse-glow" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent animate-gradient-shift">
              VISONIXRO
            </h1>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100 mb-6 font-light">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>

            {/* Features Icons */}
            <div className="flex justify-center space-x-8 mb-12">
              <div className="flex flex-col items-center group animate-zoom-in" style={{ animationDelay: '0.5s' }}>
                <div className="p-4 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-500 hover-scale animate-pulse-glow">
                  <Eye className="h-8 w-8 text-blue-300 animate-float" />
                </div>
                <span className="text-sm text-gray-300 mt-2 group-hover:text-white transition-colors duration-300">Visión</span>
              </div>
              <div className="flex flex-col items-center group animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                <div className="p-4 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-all duration-500 hover-scale animate-pulse-glow">
                  <Zap className="h-8 w-8 text-indigo-300 animate-float" style={{ animationDelay: '1s' }} />
                </div>
                <span className="text-sm text-gray-300 mt-2 group-hover:text-white transition-colors duration-300">Innovación</span>
              </div>
              <div className="flex flex-col items-center group animate-zoom-in" style={{ animationDelay: '0.9s' }}>
                <div className="p-4 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-all duration-500 hover-scale animate-pulse-glow">
                  <Cpu className="h-8 w-8 text-cyan-300 animate-float" style={{ animationDelay: '2s' }} />
                </div>
                <span className="text-sm text-gray-300 mt-2 group-hover:text-white transition-colors duration-300">Tecnología</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToAbout}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-blue-500/25 animate-gradient-shift animate-pulse-glow"
            >
              {t.hero.cta}
              <ChevronDown className="ml-2 h-5 w-5 animate-bounce group-hover:animate-float transition-all duration-300" />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
              <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
