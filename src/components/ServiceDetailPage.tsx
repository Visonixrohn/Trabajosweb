import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { ArrowLeft, Check, Phone, Mail, MessageCircle } from 'lucide-react';

interface ServiceDetailPageProps {
  serviceKey: 'service1' | 'service2' | 'service3';
  icon: React.ElementType;
  bgGradient: string;
  imageUrl?: string;
}

const ServiceDetailPage = ({ serviceKey, icon: Icon, bgGradient, imageUrl }: ServiceDetailPageProps) => {
  const { t } = useLanguage();
  const { goHome } = useRouter();
  
  const service = t.services[serviceKey];

  const scrollToContact = () => {
    goHome();
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={goHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">{t.services.backToServices}</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="VISONIXRO" className="h-8 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                VISONIXRO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-r ${bgGradient} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-grid-white-10 bg-[size:30px_30px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
              <Icon className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Beneficios de Digitalizar tu Negocio
            </h2>
            <p className="text-xl text-gray-600">
              Descubre cómo nuestros servicios pueden transformar tu empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para Transformar tu Negocio?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy y descubre cómo podemos ayudarte a llevar tu empresa al siguiente nivel digital.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://api.whatsapp.com/send/?phone=50488632788&text=Hola, me interesa el servicio de ${service.title}&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
              
              <a
                href={`tel:${t.location.phone}`}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t.location.phone}
              </a>
              
              <a
                href={`mailto:${t.location.email}`}
                className="inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5 mr-2" />
                {t.location.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
