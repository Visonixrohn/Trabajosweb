import { useRouter } from "../contexts/RouterContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Target, Eye, Award, Users, User, Lightbulb } from "lucide-react";
import CeoCard from "./CeoCard";

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Target,
      title: t.about.mission,
      description: t.about.missionText,
      color: "from-blue-500 to-blue-600",
      custom: null,
    },
    {
      icon: Lightbulb,
      title: t.about.vision,
      description: t.about.visionText,
      color: "from-indigo-500 to-indigo-600",
      custom: null,
    },
  ];

  const { navigateTo } = useRouter();
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t.about.title}
          </h2>
          <p className="text-xl text-blue-600 font-medium mb-6">
            {t.about.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="prose prose-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                {t.about.description}
              </p>
            </div>
            {/* Card CEO embebida, visualmente igual a las demás */}
            <div
              className="group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1 cursor-pointer"
              onClick={(e) => {
                // Evitar que el click en el botón interno se propague
                if ((e.target as HTMLElement).tagName === "BUTTON") return;
                if (typeof window !== "undefined") {
                  window.location.hash = "CeoBiografia";
                }
              }}
            >
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white transition-transform duration-300 group-hover:scale-110">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300"></h3>
                <div className="mt-2">
                  {/* Contenido principal de la card del CEO */}
                  <div className="text-gray-600 leading-relaxed mb-2"></div>
                  <div className="text-center w-full">
                    <img
                      src="/perf.png"
                      alt="Miguel Ángel Romero Guillén"
                      className="h-20 w-20 rounded-full border-2 border-white shadow mb-2 object-cover mx-auto"
                    />
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Miguel Ángel Romero Guillén
                    </h4>
                    <span className="text-blue-600 text-sm font-medium mb-2 block">
                      Desarrollador y Emprendedor Hondureño
                    </span>
                    <p className="text-gray-600 text-sm mb-3">
                      Soy un desarrollador y emprendedor hondureño apasionado
                      por la tecnología y la innovación digital. Con más de 3
                      años de experiencia en programación, diseño web y
                      desarrollo de aplicaciones, me especializo en crear
                      páginas web modernas y aplicaciones funcionales en
                      AppSheet que impulsan a negocios y emprendedores.
                    </p>
                    <button
                      className="mt-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-medium shadow hover:from-purple-600 hover:to-purple-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo("CeoBiografia");
                      }}
                    >
                      Ver biografía completa
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Features Grid */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                >
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* Card CEO dedicada */}
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white overflow-hidden animate-fade-in">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-white-10 bg-[size:30px_30px] animate-pulse" />

              {/* Logo Display */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <img
                    src="/logo.png"
                    alt="VISONIXRO"
                    className="h-55 w-auto mx-auto filter drop-shadow-2xl animate-fade-in"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 animate-slide-in">
                      2025
                    </div>
                    <div className="text-blue-200">Fundada</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 animate-slide-in">
                      100%
                    </div>
                    <div className="text-blue-200">Innovación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 animate-slide-in">
                      24/7
                    </div>
                    <div className="text-blue-200">Soporte</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 animate-slide-in">
                      ∞
                    </div>
                    <div className="text-blue-200">Posibilidades</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-spin-slow" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse" />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-lg rotate-12 opacity-80 animate-float" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-500 rounded-lg -rotate-12 opacity-80 animate-float" />
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-cyan-500 rounded-full opacity-60 animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
