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

  const quickLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.location, href: '#location' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.png" alt="VISONIXRO" className="h-12 w-auto" loading="lazy" />
              <span className="text-2xl font-bold tracking-wide">VISONIXRO</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              Innovación visual avanzada que transforma la manera en que interactuamos con la tecnología.
              Liderando el futuro de las soluciones visuales.
            </p>
            <div className="flex items-center text-blue-300 space-x-2">
              <Eye className="h-5 w-5" />
              <span className="font-medium">Visión • Innovación • Tecnología</span>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Enlaces Rápidos</h3>
            <nav className="space-y-3">
              {quickLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-gray-300 hover:text-white transition duration-200"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-5">{t.footer.contact}</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-300 mt-1" />
                <div>
                  <p>{t.location.address}</p>
                  <p className="text-sm text-gray-400">16.351817, -86.464353</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <p>{t.location.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <p>{t.location.email}</p>
              </div>
            </div>
          </div>
        </div>
{/* Brand Info con redes sociales */}
<div className="lg:col-span-2">
  <div className="flex items-center space-x-3 mb-6">
    <img src="/logo.png" alt="VISONIXRO" className="h-12 w-auto" loading="lazy" />
    <span className="text-2xl font-bold tracking-wide">VISONIXRO</span>
  </div>
  <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
    Innovación visual avanzada que transforma la manera en que interactuamos con la tecnología.
    Liderando el futuro de las soluciones visuales.
  </p>

  <div className="flex items-center text-blue-300 space-x-2 mb-4">
    <Eye className="h-5 w-5" />
    <span className="font-medium">Visión • Innovación • Tecnología</span>
  </div>

  {/* Redes sociales aquí */}
  <div className="mt-4">
    <h4 className="text-sm text-gray-400 mb-2">{t.footer.follow}</h4>
    <div className="flex space-x-4">
      {socialLinks.map((social, i) => (
        <a
          key={i}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 group"
        >
          <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </a>
      ))}
    </div>
  </div>
</div>


        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 text-sm flex flex-col md:flex-row md:justify-between items-center text-gray-400">
          <p className="mb-4 md:mb-0">{t.footer.rights}</p>
          
        </div>
      </div>

      {/* Accent Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
    </footer>
  );
};

export default Footer;
