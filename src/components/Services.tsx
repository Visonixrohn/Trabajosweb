import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { Smartphone, Globe, Share2, ArrowRight } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();
  const { navigateTo } = useRouter();

  const services = [
    {
      icon: Smartphone,
      title: t.services.service1.title,
      description: t.services.service1.description,
      color: "text-blue-400",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      border: "group-hover:border-blue-500/50",
      page: "service-1" as const,
    },
    {
      icon: Globe,
      title: t.services.service2.title,
      description: t.services.service2.description,
      color: "text-violet-400",
      bgGradient: "from-violet-500/10 to-violet-600/5",
      border: "group-hover:border-violet-500/50",
      page: "service-2" as const,
    },
    {
      icon: Share2,
      title: t.services.service3.title,
      description: t.services.service3.description,
      color: "text-cyan-400",
      bgGradient: "from-cyan-500/10 to-cyan-600/5",
      border: "group-hover:border-cyan-500/50",
      page: "service-3" as const,
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {t.services.title}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light">
            {t.services.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => navigateTo(service.page)}
              className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 transition-all duration-500 hover:transform hover:-translate-y-2 cursor-pointer ${service.border}`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-500 ${service.color}`}>
                  <service.icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-sm font-semibold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">
                  <span>{t.services.learnMore}</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-violet-900/50 backdrop-blur-md border border-white/10" />
          <div className="relative z-10 p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-6">
              ¿Listo para transformar tu visión digital?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy y descubre cómo podemos llevar tu proyecto al
              siguiente nivel con nuestras soluciones visuales innovadoras.
            </p>
            <button
              onClick={() => navigateTo("contact-form")}
              className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Comenzar Proyecto
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
