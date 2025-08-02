import { createContext, useContext, useState, ReactNode } from 'react';

// Definición de tipos para las traducciones
export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    location: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    mission: string;
    missionText: string;
    vision: string;
    visionText: string;
    values: string;
    ceo: string;
  };
  services: {
    title: string;
    subtitle: string;
    service1: {
      title: string;
      description: string;
      benefits: string[];
    };
    service2: {
      title: string;
      description: string;
      benefits: string[];
    };
    service3: {
      title: string;
      description: string;
      benefits: string[];
    };
    learnMore: string;
    backToServices: string;
    contactUs: string;
  };
  location: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  footer: {
    rights: string;
    contact: string;
    follow: string;
  };
  forms: {
    contact: {
      title: string;
      subtitle: string;
      name: string;
      phone: string;
      email: string;
      businessType: string;
      serviceType: string;
      submit: string;
      backToHome: string;
      successMessage: string;
    };
    appointment: {
      title: string;
      subtitle: string;
      date: string;
      time: string;
      schedule: string;
    };
    businessTypes: string[];
    serviceTypes: string[];
    validation: {
      required: string;
      emailInvalid: string;
      phoneInvalid: string;
    };
  };
}

// Traducciones en español
const esTranslations: Translations = {
  nav: {
    home: 'Inicio',
    about: 'Acerca de',
    services: 'Servicios',
    location: 'Ubicación',
    contact: 'Contacto'
  },
  hero: {
    title: 'Innovación Visual Avanzada',
    subtitle: 'Tecnología de Vanguardia para el Futuro',
    description: 'VISONIXRO está a la vanguardia de la innovación tecnológica, proporcionando soluciones visuales avanzadas que transforman la manera en que interactuamos con la tecnología.',
    cta: 'Descubre Más'
  },
  about: {
    title: 'Acerca de VISONIXRO',
    subtitle: 'Liderando la Revolución Visual',
    description: 'Somos una empresa pionera en el desarrollo de tecnologías visuales avanzadas que redefinen los límites de lo posible en el mundo digital.',
    mission: 'Nuestra Misión',
    missionText: 'Brindar soluciones modernas, accesibles y de alta calidad que respondan a las necesidades reales de las personas, integrando creatividad, servicio personalizado y compromiso con la excelencia en todo lo que hacemos.',
    vision: 'Nuestra Visión',
    visionText: 'Ser una marca líder en innovación y confianza, conectando tecnología, diseño y propósito para transformar la experiencia de nuestros clientes en cada producto o servicio que ofrecemos.',
    values: 'Innovación, Calidad, Excelencia y Compromiso',
    ceo: 'Miguel Angel Romeo Guillen'
  },
  services: {
    title: 'Nuestros Servicios',
    subtitle: 'Soluciones Digitales que Transforman tu Negocio',
    service1: {
      title: 'Creación de Aplicaciones y Sistemas Empresariales',
      description: 'Desarrollamos aplicaciones móviles y sistemas empresariales personalizados que automatizan procesos y mejoran la eficiencia operativa de tu negocio.',
      benefits: [
        'Incremento de ventas online hasta 300%',
        'Automatización de procesos empresariales',
        'Mejora de imagen profesional',
        'ROI medible y comprobable',
        'Disponibilidad 24/7 para clientes',
        'Escalabilidad y crecimiento sostenible'
      ]
    },
    service2: {
      title: 'Creación de Páginas Web',
      description: 'Diseñamos y desarrollamos sitios web modernos, responsivos y optimizados para SEO que convierten visitantes en clientes.',
      benefits: [
        'Alcance global de mercado',
        'Mejora de credibilidad empresarial',
        'Generación de leads cualificados',
        'Competitividad en mercado digital',
        'Posicionamiento en buscadores',
        'Presencia profesional online'
      ]
    },
    service3: {
      title: 'Manejo de Redes Sociales',
      description: 'Gestionamos tu presencia en redes sociales con estrategias de contenido que aumentan el engagement y las ventas.',
      benefits: [
        'Aumento de visibilidad de marca',
        'Conexión directa con clientes',
        'Incremento de ventas directas',
        'Fidelización de clientes',
        'Análisis de comportamiento del consumidor',
        'Campañas publicitarias efectivas'
      ]
    },
    learnMore: 'Más Información',
    backToServices: 'Volver a Servicios',
    contactUs: 'Contáctanos Ahora'
  },
  location: {
    title: 'Nuestra Ubicación',
    subtitle: 'Visítanos',
    address: 'Honduras, Centroamérica',
    phone: '+504 88632788',
    email: 'INFO@VISONIXRO.COM',
    hours: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
  },
  footer: {
    rights: '© 2024 VISONIXRO. Todos los derechos reservados.',
    contact: 'Contacto',
    follow: 'Síguenos'
  },
  forms: {
    contact: {
      title: 'Transformar tu Visión Digital',
      subtitle: 'Cuéntanos sobre tu proyecto y te contactaremos pronto',
      name: 'Nombre completo',
      phone: 'Teléfono',
      email: 'Correo electrónico',
      businessType: 'Tipo de negocio',
      serviceType: 'Servicio que necesitas',
      submit: 'Enviar Consulta',
      backToHome: 'Volver al Inicio',
      successMessage: 'Mensaje enviado exitosamente. Te contactaremos pronto.'
    },
    appointment: {
      title: 'Agendar una Cita',
      subtitle: 'Programa una reunión para discutir tu proyecto',
      date: 'Fecha',
      time: 'Hora',
      schedule: 'Agendar Cita'
    },
    businessTypes: [
      'Restaurante/Comida',
      'Retail/Comercio',
      'Servicios Profesionales',
      'Tecnología',
      'Salud/Medicina',
      'Educación',
      'Inmobiliaria',
      'Turismo/Hospitalidad',
      'Manufactura',
      'Otro'
    ],
    serviceTypes: [
      'Creación de Aplicaciones y Sistemas Empresariales',
      'Creación de Páginas Web',
      'Manejo de Redes Sociales'
    ],
    validation: {
      required: 'Este campo es obligatorio',
      emailInvalid: 'Ingresa un correo válido',
      phoneInvalid: 'Ingresa un teléfono válido'
    }
  }
};

// Traducciones en inglés
const enTranslations: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    location: 'Location',
    contact: 'Contact'
  },
  hero: {
    title: 'Advanced Visual Innovation',
    subtitle: 'Cutting-Edge Technology for the Future',
    description: 'VISONIXRO is at the forefront of technological innovation, providing advanced visual solutions that transform the way we interact with technology.',
    cta: 'Discover More'
  },
  about: {
    title: 'About VISONIXRO',
    subtitle: 'Leading the Visual Revolution',
    description: 'We are a pioneering company in the development of advanced visual technologies that redefine the limits of what is possible in the digital world.',
    mission: 'Our Mission',
    missionText: 'Provide modern, accessible and high-quality solutions that respond to the real needs of people, integrating creativity, personalized service and commitment to excellence in everything we do.',
    vision: 'Our Vision',
    visionText: 'To be a leading brand in innovation and trust, connecting technology, design and purpose to transform our customers\' experience in every product or service we offer.',
    values: 'Innovation, Quality, Excellence and Commitment',
    ceo: 'Miguel Angel Romeo Guillen'
  },
  services: {
    title: 'Our Services',
    subtitle: 'Digital Solutions that Transform Your Business',
    service1: {
      title: 'Enterprise Applications and Systems Development',
      description: 'We develop custom mobile applications and enterprise systems that automate processes and improve your business operational efficiency.',
      benefits: [
        'Online sales increase up to 300%',
        'Business process automation',
        'Professional image improvement',
        'Measurable and provable ROI',
        '24/7 availability for customers',
        'Scalability and sustainable growth'
      ]
    },
    service2: {
      title: 'Website Development',
      description: 'We design and develop modern, responsive and SEO-optimized websites that convert visitors into customers.',
      benefits: [
        'Global market reach',
        'Business credibility improvement',
        'Qualified lead generation',
        'Digital market competitiveness',
        'Search engine positioning',
        'Professional online presence'
      ]
    },
    service3: {
      title: 'Social Media Management',
      description: 'We manage your social media presence with content strategies that increase engagement and sales.',
      benefits: [
        'Increased brand visibility',
        'Direct connection with customers',
        'Direct sales increase',
        'Customer loyalty',
        'Consumer behavior analysis',
        'Effective advertising campaigns'
      ]
    },
    learnMore: 'Learn More',
    backToServices: 'Back to Services',
    contactUs: 'Contact Us Now'
  },
  location: {
    title: 'Our Location',
    subtitle: 'Visit Us',
    address: 'Honduras, Central America',
    phone: '+504 88632788',
    email: 'INFO@VISONIXRO.COM',
    hours: 'Monday to Friday: 8:00 AM - 6:00 PM'
  },
  footer: {
    rights: '© 2024 VISONIXRO. All rights reserved.',
    contact: 'Contact',
    follow: 'Follow Us'
  },
  forms: {
    contact: {
      title: 'Transform Your Digital Vision',
      subtitle: 'Tell us about your project and we will contact you soon',
      name: 'Full name',
      phone: 'Phone',
      email: 'Email',
      businessType: 'Business type',
      serviceType: 'Service you need',
      submit: 'Send Query',
      backToHome: 'Back to Home',
      successMessage: 'Message sent successfully. We will contact you soon.'
    },
    appointment: {
      title: 'Schedule an Appointment',
      subtitle: 'Schedule a meeting to discuss your project',
      date: 'Date',
      time: 'Time',
      schedule: 'Schedule Appointment'
    },
    businessTypes: [
      'Restaurant/Food',
      'Retail/Commerce',
      'Professional Services',
      'Technology',
      'Health/Medicine',
      'Education',
      'Real Estate',
      'Tourism/Hospitality',
      'Manufacturing',
      'Other'
    ],
    serviceTypes: [
      'Enterprise Applications and Systems Development',
      'Website Development',
      'Social Media Management'
    ],
    validation: {
      required: 'This field is required',
      emailInvalid: 'Enter a valid email',
      phoneInvalid: 'Enter a valid phone number'
    }
  }
};

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('es');

  const translations = language === 'es' ? esTranslations : enTranslations;

  const value = {
    language,
    setLanguage,
    t: translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
