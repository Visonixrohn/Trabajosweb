import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, MessageCircle, Eye } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/people/VisonixRo/61574218733448/?rdid=LEmCZFuf2hUaEAcY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FcnVQfbyP%2F', 
      label: 'Facebook' 
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/ViSonixRo?t=uu5YQRmeTqZaGKuWjp8Mzg&s=09', 
      label: 'Twitter' 
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/visonixro?igsh=Z3hubWpwdzRpeDhm', 
      label: 'Instagram' 
    },
    { 
      icon: MessageCircle, 
      href: 'https://api.whatsapp.com/send/?phone=50488632788&text&type=phone_number&app_absent=0', 
      label: 'WhatsApp' 
    }
  ];

  const quickLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.location, href: '#location' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.png" alt="VISONIXRO" className="h-12 w-auto" />
              <span className="text-2xl font-bold">VISONIXRO</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Innovación visual avanzada que transforma la manera en que interactuamos con la tecnología. 
              Liderando el futuro de las soluciones visuales.
            </p>
            <div className="flex items-center space-x-2 text-blue-200">
              <Eye className="h-5 w-5" />
              <span className="font-medium">Visión • Innovación • Tecnología</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Enlaces Rápidos</h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{t.footer.contact}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-300 mt-1" />
                <div>
                  <p className="text-gray-300">{t.location.address}</p>
                  <p className="text-sm text-gray-400">16.351817, -86.464353</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <p className="text-gray-300">{t.location.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <p className="text-gray-300">{t.location.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">{t.footer.follow}</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-r-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium">
                  Suscribirse
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Recibe las últimas noticias y actualizaciones.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t.footer.rights}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
    </footer>
  );
};

export default Footer;
