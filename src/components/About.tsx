import { useLanguage } from '../contexts/LanguageContext';
import { Target, Lightbulb, User, Users } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Target,
      title: t.about.mission,
      description: t.about.missionText,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Lightbulb,
      title: t.about.vision,
      description: t.about.visionText,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: User,
      title: 'CEO',
      description: t.about.ceo,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  // Cambio mínimo para forzar commit
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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

          {/* Visual Side (moved to left) */}
          <div className="relative order-1 lg:order-none">
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white overflow-hidden">

              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-white-10 bg-[size:30px_30px]" />

              {/* Logo & Stats */}
              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <img
                    src="/logo.png"
                    alt="VISONIXRO"
                    className="h-32 w-auto mx-auto filter drop-shadow-2xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <Stat label="Fundada" value="2024" />
                  <Stat label="Innovación" value="100%" />
                  <Stat label="Soporte" value="24/7" />
                  <Stat label="Posibilidades" value="∞" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-lg rotate-12 opacity-80" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-indigo-500 rounded-lg -rotate-12 opacity-80" />
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-cyan-500 rounded-full opacity-60" />
          </div>

          {/* Content Side (moved to right) */}
          <div className="space-y-8 order-2 lg:order-none">

            <div className="prose prose-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                {t.about.description}
              </p>
            </div>

            {/* Features */}
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
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium">
            <Users className="h-4 w-4" />
            <span>Únete a la revolución visual</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-3xl font-bold mb-2">{value}</div>
    <div className="text-blue-200">{label}</div>
  </div>
);

export default About;
