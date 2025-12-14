import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Building,
  Briefcase,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  businessType: string;
  serviceType: string;
  date: string;
  time: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  businessType?: string;
  serviceType?: string;
  date?: string;
  time?: string;
}

const AppointmentFormPage = () => {
  const { t } = useLanguage();
  const { goHome } = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    businessType: "",
    serviceType: "",
    date: "",
    time: "",
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

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
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

    if (!formData.date) {
      newErrors.date = t.forms.validation.required;
    } else if (!validateDate(formData.date)) {
      newErrors.date = "La fecha no puede ser anterior a hoy";
    }

    if (!formData.time) {
      newErrors.time = t.forms.validation.required;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const generateWhatsAppMessage = () => {
    return `Hola, me interesa agendar una cita:

Nombre: ${formData.name}
Teléfono: ${formData.phone}
Correo: ${formData.email}
Tipo de negocio: ${formData.businessType}
Servicio necesitado: ${formData.serviceType}
Fecha: ${formatDate(formData.date)}
Hora: ${formatTime(formData.time)}

Espero confirmen la disponibilidad. Gracias.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=50488857653&text=${encodeURIComponent(
        message
      )}&type=phone_number&app_absent=0`;

      window.open(whatsappUrl, "_blank");
      setShowSuccess(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        businessType: "",
        serviceType: "",
        date: "",
        time: "",
      });

      setTimeout(() => {
        goHome();
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
            ¡Cita Agendada!
          </h2>
          <p className="text-gray-400 mb-6 relative z-10">
            Te contactaremos para confirmar la disponibilidad de tu cita.
          </p>
          <p className="text-sm text-blue-400 animate-pulse relative z-10">
            Redirigiendo al inicio en unos segundos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative flex flex-col">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />


      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <button
              onClick={goHome}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mr-4 group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="font-medium hidden sm:inline">{t.forms.contact.backToHome}</span>
            </button>
            <div className="hidden lg:flex flex-1 items-center justify-between">
              <img
                src="/logo.png"
                alt="VISONIXRO"
                className="h-16 w-auto drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 tracking-wide font-display">
                VISONIXRO
              </span>
            </div>
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center space-x-3 ml-auto">
              <img
                src="/logo.png"
                alt="VISONIXRO"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 font-display">
                VISONIXRO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 relative z-10 flex-grow flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Text */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
                {t.forms.appointment.title}
              </h1>
              <p className="text-xl text-blue-200/80">
                {t.forms.appointment.subtitle}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column (Info/Visual) - Desktop Only */}
              <div className="hidden lg:flex flex-col justify-center items-center w-1/3 space-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <img
                    src="/perf.png"
                    alt="Miguel Ángel Romero Guillén"
                    className="relative h-48 w-48 rounded-full border-4 border-white/20 shadow-2xl object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Miguel A. Romero</h3>
                  <p className="text-blue-400 text-sm">CEO & Developer</p>
                </div>
              </div>

              {/* Form Container */}
              <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"></div>

                {/* Mobile Profile (Visible only on small screens) */}
                <div className="lg:hidden flex items-center justify-center gap-4 p-6 pb-0">
                  <img
                    src="/logo.png"
                    alt="VISONIXRO"
                    className="h-12 w-auto"
                  />
                  <img
                    src="/perf.png"
                    alt="Miguel Ángel Romero Guillén"
                    className="h-12 w-12 rounded-full border-2 border-blue-500 object-cover"
                  />
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-300 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {t.forms.contact.name} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${errors.name ? "border-red-500/50" : "border-white/10"
                          } text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                        placeholder="Tu nombre completo"
                      />
                      {errors.name && <p className="text-xs text-red-400 ml-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-300 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {t.forms.contact.phone} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${errors.phone ? "border-red-500/50" : "border-white/10"
                          } text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                        placeholder="+504 9999-9999"
                      />
                      {errors.phone && <p className="text-xs text-red-400 ml-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-300 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {t.forms.contact.email} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${errors.email ? "border-red-500/50" : "border-white/10"
                        } text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                      placeholder="tucorreo@ejemplo.com"
                    />
                    {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Business Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-300 flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        {t.forms.contact.businessType} *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.businessType}
                          onChange={(e) => handleInputChange("businessType", e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${errors.businessType ? "border-red-500/50" : "border-white/10"
                            } text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none transition-all cursor-pointer`}
                        >
                          <option value="" className="bg-slate-900 text-gray-500">Selecciona tipo de negocio</option>
                          {t.forms.businessTypes.map((type, index) => (
                            <option key={index} value={type} className="bg-slate-900 text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                      </div>
                      {errors.businessType && <p className="text-xs text-red-400 ml-1">{errors.businessType}</p>}
                    </div>

                    {/* Service Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-300 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {t.forms.contact.serviceType} *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.serviceType}
                          onChange={(e) => handleInputChange("serviceType", e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${errors.serviceType ? "border-red-500/50" : "border-white/10"
                            } text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none transition-all cursor-pointer`}
                        >
                          <option value="" className="bg-slate-900 text-gray-500">Selecciona el servicio</option>
                          {t.forms.serviceTypes.map((type, index) => (
                            <option key={index} value={type} className="bg-slate-900 text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                      </div>
                      {errors.serviceType && <p className="text-xs text-red-400 ml-1">{errors.serviceType}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-300 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {t.forms.appointment.date} *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          min={today}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${errors.date ? "border-red-500/50" : "border-white/10"
                            } text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer`}
                          style={{ colorScheme: 'dark' }}
                        />
                        <style>{`
                                        input[type="date"]::-webkit-calendar-picker-indicator {
                                            filter: invert(1);
                                            cursor: pointer;
                                            opacity: 0.6;
                                        }
                                        input[type="date"]::-webkit-calendar-picker-indicator:hover {
                                            opacity: 1;
                                        }
                                    `}</style>
                      </div>
                      {errors.date && <p className="text-xs text-red-400 ml-1">{errors.date}</p>}
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-300 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {t.forms.appointment.time} *
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => handleInputChange("time", e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${errors.time ? "border-red-500/50" : "border-white/10"
                            } text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer`}
                          style={{ colorScheme: 'dark' }}
                        />
                        <style>{`
                                        input[type="time"]::-webkit-calendar-picker-indicator {
                                            filter: invert(1);
                                            cursor: pointer;
                                            opacity: 0.6;
                                        }
                                        input[type="time"]::-webkit-calendar-picker-indicator:hover {
                                            opacity: 1;
                                        }
                                    `}</style>
                      </div>
                      {errors.time && <p className="text-xs text-red-400 ml-1">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] hover:bg-right hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Agendando...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                          {t.forms.appointment.schedule}
                        </div>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    * Campos obligatorios
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentFormPage;
