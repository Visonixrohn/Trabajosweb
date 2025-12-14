import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { ChevronDown, ArrowRight, Code2, Rocket, Globe2, Zap } from 'lucide-react';

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-t from-violet-600/20 to-transparent blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}


          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 animate-slide-up font-display">
            Tu Visión, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 animate-gradient-x bg-300%">
              Nuestra Tecnología
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100 font-light">
            {t.hero.description || "Transformamos ideas complejas en experiencias digitales extraordinarias. Desarrollo web de alto nivel para el futuro de tu negocio."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up delay-200">
            <button
              onClick={scrollToAbout}
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Comenzar Proyecto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
            >
              Explorar Servicios
            </button>
          </div>

          {/* Stats / Trust Indicators */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12 animate-fade-in delay-300">
            <div className="text-center group">
              <div className="flex justify-center mb-3 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="h-8 w-8" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">100+</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">Proyectos Base</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3 text-violet-400 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="h-8 w-8" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">99%</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">Uptime</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <Globe2 className="h-8 w-8" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">GLOBAL</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">Alcance</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">Soporte</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-gray-500/50" />
      </div>
    </section>
  );
};

export default Hero;
