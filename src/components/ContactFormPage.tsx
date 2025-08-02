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
    // Clear error when user starts typing
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
      // Generate WhatsApp URL
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=50488632788&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        businessType: '',
        serviceType: ''
      });
      
      // Auto redirect to home after 3 seconds
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Mensaje Enviado!</h2>
          <p className="text-gray-600 mb-6">{t.forms.contact.successMessage}</p>
          <p className="text-sm text-gray-500">Redirigiendo al inicio en unos segundos...</p>
        </div>
      </div>
    );
  }

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
              <span className="font-medium">{t.forms.contact.backToHome}</span>
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

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t.forms.contact.title}
              </h1>
              <p className="text-xl text-gray-600">
                {t.forms.contact.subtitle}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Información de Contacto</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      {t.forms.contact.name} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                      placeholder="Ingresa tu nombre completo"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      {t.forms.contact.phone} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                      placeholder="+504 1234-5678"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      {t.forms.contact.email} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Business Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="h-4 w-4 inline mr-2" />
                      {t.forms.contact.businessType} *
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.businessType ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                    >
                      <option value="">Selecciona tipo de negocio</option>
                      {t.forms.businessTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      {t.forms.contact.serviceType} *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.serviceType ? 'border-red-300' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
                    >
                      <option value="">Selecciona el servicio</option>
                      {t.forms.serviceTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.serviceType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-2" />
                        {t.forms.contact.submit}
                      </div>
                    )}
                  </button>
                </div>

                <p className="text-sm text-gray-500 text-center mt-4">
                  * Campos obligatorios
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactFormPage;
