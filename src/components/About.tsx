import { useRouter } from "../contexts/RouterContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Target, Eye, Award, Users, User, Lightbulb } from "lucide-react";
import CeoCard from "./CeoCard";

const About = () => {
  const { t } = useLanguage();
  const { navigateTo } = useRouter();

  const features = [
    {
      icon: Target,
      title: t.about.mission,
      description: t.about.missionText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "group-hover:border-blue-500/50",
    },
    {
      icon: Lightbulb,
      title: t.about.vision,
      description: t.about.visionText,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "group-hover:border-violet-500/50",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display">
            {t.about.title}
          </h2>
          <p className="text-xl text-blue-400 font-medium mb-6">
            {t.about.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="prose prose-lg">
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {t.about.description}
              </p>
            </div>

            {/* CEO Card */}
            <CeoCard />

            {/* Features Grid */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 ${feature.border} transition-all duration-500 hover:transform hover:-translate-y-1 hover:bg-white/10`}
                >
                  <div
                    className={`p-4 rounded-xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-blue-900 to-violet-900 rounded-3xl p-8 text-white overflow-hidden border border-white/10 shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20 mix-blend-overlay" />

              {/* Logo Display */}
              <div className="relative z-10 text-center">
                <div className="mb-12 mt-4">
                  <img
                    src="/logo.png"
                    alt="VISONIXRO"
                    className="h-48 w-auto mx-auto drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] animate-float"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-8 mt-8 border-t border-white/10 pt-8">
                  <div className="text-center group p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
                      2025
                    </div>
                    <div className="text-blue-200 text-sm tracking-wider uppercase">Fundada</div>
                  </div>
                  <div className="text-center group p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-white">
                      100%
                    </div>
                    <div className="text-blue-200 text-sm tracking-wider uppercase">Innovación</div>
                  </div>
                  <div className="text-center group p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-white">
                      24/7
                    </div>
                    <div className="text-blue-200 text-sm tracking-wider uppercase">Soporte</div>
                  </div>
                  <div className="text-center group p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-white">
                      ∞
                    </div>
                    <div className="text-blue-200 text-sm tracking-wider uppercase">Posibilidades</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]" />
            </div>

            {/* Floating Dots/Elements */}
            <div className="absolute -top-6 -left-6 w-4 h-4 bg-blue-400 rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-4 h-4 bg-violet-400 rounded-full animate-pulse-slow delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
