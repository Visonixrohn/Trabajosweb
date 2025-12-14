import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from '../contexts/RouterContext';
import { ArrowLeft, Send, Phone, Mail, User, Building, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  businessType: string;
  serviceType: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  businessType?: string;
  serviceType?: string;
}

const ContactFormPage = () => {
  const { t } = useLanguage();
  const { goHome } = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    serviceType: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.forms.validation.required;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.forms.validation.required;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t.forms.validation.phoneInvalid;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.forms.validation.required;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.forms.validation.emailInvalid;
    }

    if (!formData.businessType) {
      newErrors.businessType = t.forms.validation.required;
    }

    if (!formData.serviceType) {
      newErrors.serviceType = t.forms.validation.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const generateWhatsAppMessage = () => {
    return `Hola, me interesa sus servicios:

Nombre: ${formData.name}
Teléfono: ${formData.phone}
Correo: ${formData.email}
Tipo de negocio: ${formData.businessType}
Servicio necesitado: ${formData.serviceType}

Espero su contacto pronto. Gracias.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=50488857653&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

      window.open(whatsappUrl, '_blank');

      setShowSuccess(true);

      setFormData({
        name: '',
        phone: '',
        email: '',
        businessType: '',
        serviceType: ''
      });

      setTimeout(() => {
        goHome();
      }, 3000);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">¡Mensaje Enviado!</h2>
          <p className="text-gray-300 mb-8">{t.forms.contact.successMessage}</p>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-[progress_3s_linear_forwards]"></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Redirigiendo al inicio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-[1000px] h-[1000px] bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 bg-slate-900/80 backdrop-blur-md border-b border-white/5 sticky top-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={goHome}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="font-medium">{t.forms.contact.backToHome}</span>
            </button>

            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="VISONIXRO" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white font-display tracking-wide">
                VISONIXRO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                {t.forms.contact.title}
              </h1>
              <p className="text-xl text-gray-400 font-light">
                {t.forms.contact.subtitle}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Mail className="mr-3 h-6 w-6" />
                  Información de Contacto
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">
                      {t.forms.contact.name} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 rounded-xl border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                          } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-400 flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">
                      {t.forms.contact.phone} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 rounded-xl border ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                          } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                        placeholder="+504 9999-9999"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-400 flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">
                    {t.forms.contact.email} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 rounded-xl border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                        } text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400 flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">
                      {t.forms.contact.businessType} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-500" />
                      </div>
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 rounded-xl border ${errors.businessType ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                          } text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all appearance-none`}
                      >
                        <option value="" className="bg-slate-900">Selecciona tipo de negocio</option>
                        {t.forms.businessTypes.map((type, index) => (
                          <option key={index} value={type} className="bg-slate-900">{type}</option>
                        ))}
                      </select>
                    </div>
                    {errors.businessType && (
                      <p className="text-sm text-red-400 flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.businessType}
                      </p>
                    )}
                  </div>

                  {/* Service Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">
                      {t.forms.contact.serviceType} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-500" />
                      </div>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-900/50 rounded-xl border ${errors.serviceType ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                          } text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all appearance-none`}
                      >
                        <option value="" className="bg-slate-900">Selecciona el servicio</option>
                        {t.forms.serviceTypes.map((type, index) => (
                          <option key={index} value={type} className="bg-slate-900">{type}</option>
                        ))}
                      </select>
                    </div>
                    {errors.serviceType && (
                      <p className="text-sm text-red-400 flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.serviceType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-8 flex items-center justify-center border border-white/10"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando Mensaje...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      {t.forms.contact.submit}
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 mt-6">
                  Protegemos tus datos. Al enviar aceptas nuestra política de privacidad.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
          @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
          }
      `}</style>
    </div>
  );
};

export default ContactFormPage;
