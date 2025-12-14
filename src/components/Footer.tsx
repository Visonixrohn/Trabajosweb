import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, MessageCircle, Eye } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/people/VisonixRo/61574218733448/', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/ViSonixRo', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/visonixro', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://api.whatsapp.com/send/?phone=50488857653', label: 'WhatsApp' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">

          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-4 mb-6 group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <img src="/logo.png" alt="VISONIXRO" className="relative h-16 w-auto" loading="lazy" />
              </div>
              <span className="text-3xl font-bold tracking-wide font-display text-white">VISONIXRO</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8 font-light">
              Innovación visual avanzada que transforma la manera en que interactuamos con la tecnología.
              Liderando el futuro de las soluciones digitales.
            </p>

            <div className="flex items-center text-blue-400 space-x-3 mb-8 font-medium text-lg bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              <Eye className="h-5 w-5" />
              <span>Visión • Innovación • Tecnología</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-6 text-xl tracking-wide">{t.footer.contact}</h3>
            <div className="space-y-6 text-gray-400">
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="group-hover:text-white transition-colors">{t.location.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <p className="group-hover:text-white transition-colors">{t.location.phone}</p>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <p className="group-hover:text-white transition-colors">{t.location.email}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-6 text-xl tracking-wide">{t.footer.follow}</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-105 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm text-gray-400 group-hover:text-white">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row md:justify-between md:items-center text-gray-500 text-sm">
          <p className="mb-4 md:mb-0 text-center md:text-left font-light">{t.footer.rights} &copy; {new Date().getFullYear()}</p>
          <div className="flex space-x-6 justify-center">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
