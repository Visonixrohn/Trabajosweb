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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={goHome}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="font-medium hidden sm:inline">{t.services.backToServices}</span>
            </button>

            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="VISONIXRO" className="h-10 w-auto drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 font-display">
                VISONIXRO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-10`}></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />


        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex p-6 bg-white/5 rounded-3xl mb-8 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] animate-float">
              <Icon className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-8 leading-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-200">
              {service.title}
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed font-light max-w-2xl mx-auto">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">
              Beneficios de Digitalizar tu Negocio
            </h2>
            <p className="text-xl text-blue-200/60">
              Descubre cómo nuestros servicios pueden transformar tu empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                    <Check className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="relative bg-gradient-to-r from-blue-900/50 to-violet-900/50 rounded-3xl p-12 text-center border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grid-white-10 bg-[size:20px_20px] opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6 text-white font-display">
                ¿Listo para Transformar tu Negocio?
              </h3>
              <p className="text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto font-light">
                Contáctanos hoy y descubre cómo podemos ayudarte a llevar tu empresa al siguiente nivel digital.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href={`https://api.whatsapp.com/send/?phone=50488857653&text=Hola, me interesa el servicio de ${service.title}&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>

                <a
                  href={`tel:${t.location.phone}`}
                  className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {t.location.phone}
                </a>

                <a
                  href={`mailto:${t.location.email}`}
                  className="inline-flex items-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-white/10 transition-all duration-300 hover:scale-105"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  {t.location.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
