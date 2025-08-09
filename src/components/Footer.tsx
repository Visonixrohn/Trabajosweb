import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, MessageCircle, Eye } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/people/VisonixRo/61574218733448/', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/ViSonixRo', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/visonixro', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://api.whatsapp.com/send/?phone=50488632788', label: 'WhatsApp' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white" id="contact">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Contact Info */}
          <div className="md:col-span-1 flex flex-col justify-center items-center md:items-start">
            <h3 className="text-xl font-semibold mb-6">{t.footer.contact}</h3>
            <div className="space-y-5 text-gray-300 max-w-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p>{t.location.address}</p>
                  <p className="text-sm text-gray-400 select-text">16.351817, -86.464353</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <p>{t.location.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <p>{t.location.email}</p>
              </div>
            </div>
          </div>

          {/* Empty column for spacing in lg */}
          <div className="hidden lg:block"></div>

          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-4 mb-6">
              <img src="/logo.png" alt="VISONIXRO" className="h-14 w-auto" loading="lazy" />
              <span className="text-3xl font-bold tracking-wide">VISONIXRO</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-xl mb-6">
              Innovación visual avanzada que transforma la manera en que interactuamos con la tecnología.
              Liderando el futuro de las soluciones visuales.
            </p>

            <div className="flex items-center text-blue-400 space-x-3 mb-8 font-semibold text-lg">
              <Eye className="h-6 w-6" />
              <span>Visión • Innovación • Tecnología</span>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">{t.footer.follow}</h4>
              <div className="flex justify-center md:justify-start space-x-6">
                {socialLinks.map(({ icon: Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition duration-300 group flex items-center justify-center"
                  >
                    <Icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-16 pt-6 text-sm text-gray-400 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="mb-4 md:mb-0 text-center md:text-left">{t.footer.rights}</p>
          {/* Aquí podrías agregar más elementos, por ejemplo links legales o créditos */}
        </div>
      </div>

      {/* Accent Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
    </footer>
  );
};

export default Footer;
