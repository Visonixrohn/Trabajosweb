import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { Smartphone, Globe, Share2, ArrowRight } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();
  const { navigateTo } = useRouter();

  const services = [
    {
      icon: Smartphone,
      title: t.services.service1.title,
      description: t.services.service1.description,
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      page: 'service-1' as const
    },
    {
      icon: Globe,
      title: t.services.service2.title,
      description: t.services.service2.description,
      color: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100',
      page: 'service-2' as const
    },
    {
      icon: Share2,
      title: t.services.service3.title,
      description: t.services.service3.description,
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      page: 'service-3' as const
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t.services.title}
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {t.services.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => navigateTo(service.page)}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <service.icon className="h-10 w-10" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300 min-h-[3rem]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8 group-hover:text-gray-700 transition-colors duration-300 min-h-[4rem]">
                  {service.description}
                </p>

                {/* Learn More Button */}
                <div className="inline-flex items-center px-6 py-3 bg-gray-100 group-hover:bg-white text-gray-700 group-hover:text-blue-600 font-medium rounded-full transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <span>{t.services.learnMore}</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white-10 bg-[size:30px_30px]" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                ¿Listo para transformar tu visión digital?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contáctanos hoy y descubre cómo podemos llevar tu proyecto al siguiente nivel con nuestras soluciones visuales innovadoras.
              </p>
              <button 
                onClick={() => navigateTo('contact-form')}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Comenzar Proyecto
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 right-16 w-12 h-12 bg-white/10 rounded-lg rotate-45 blur-lg" />
          </div>
        </div>
      </div>


    </section>
  );
};

export default Services;
