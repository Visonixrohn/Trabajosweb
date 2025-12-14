import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "../contexts/RouterContext";
import { MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useCallback } from "react";

// Coordenadas exactas proporcionadas
const center = {
  lat: 16.351817,
  lng: -86.464353,
};

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

const mapOptions = {
  zoom: 15,
  center: center,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ weight: "2.00" }],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [{ color: "#9c9c9c" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f2f2f2" }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#46bcec" }, { visibility: "on" }],
    },
  ],
};

// Componente de Mapa Estático como fallback
const StaticMapFallback = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-[400px] flex flex-col items-center justify-center text-center">
      <div className="p-4 bg-blue-500 rounded-full mb-4">
        <MapPin className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">VISONIXRO</h3>
      <p className="text-gray-600 mb-4">{t.location.address}</p>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-sm text-gray-500 mb-1">Coordenadas GPS:</p>
        <p className="font-mono text-blue-600">16.351817, -86.464353</p>
      </div>
      <a
        href={`https://www.google.com/maps?q=${center.lat},${center.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        <MapPin className="h-4 w-4 mr-2" />
        Abrir en Google Maps
      </a>
    </div>
  );
};

// Componente de Error
const MapErrorFallback = ({ error }: { error: string }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 h-[400px] flex flex-col items-center justify-center text-center">
      <div className="p-4 bg-red-500 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-red-900 mb-2">
        Error al cargar el mapa
      </h3>
      <p className="text-red-600 mb-4">{error}</p>
      <a
        href={`https://www.google.com/maps?q=${center.lat},${center.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        <MapPin className="h-4 w-4 mr-2" />
        Ver en Google Maps
      </a>
    </div>
  );
};

const Location = () => {
  const { t } = useLanguage();
  const { navigateTo } = useRouter();
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      label: "Dirección",
      value: t.location.address,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: t.location.phone,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      icon: Mail,
      label: "Email",
      value: t.location.email,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      icon: Clock,
      label: "Horario",
      value: t.location.hours,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ];

  const onLoad = useCallback(() => {
    setIsLoaded(true);
    setMapError(null);
  }, []);

  const onError = useCallback((error: Error) => {
    console.error("Google Maps error:", error);
    setMapError(
      "No se pudo cargar Google Maps. Verifica tu conexión a internet."
    );
    setIsLoaded(false);
  }, []);

  const MarkerIcon =
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="#2563eb" stroke="#ffffff" stroke-width="3"/>
      <circle cx="16" cy="16" r="6" fill="#ffffff"/>
    </svg>
  `);

  return (
    <section
      id="contacto"
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Contact Information */}
          <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10 mb-8 lg:mb-0 hover:border-blue-500/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
              Información de Contacto
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-6 group">
                  <div className={`p-4 rounded-2xl ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 tracking-wide">
                      {item.label}
                    </h4>
                    <p className="text-gray-400 group-hover:text-blue-200 transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info / Call to Action Box */}
          <div className="flex-1 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-3xl p-10 text-white flex flex-col justify-center border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">¿Cómo llegar?</h3>
              <p className="text-blue-100 mb-8 text-lg font-light leading-relaxed">
                Estamos ubicados en Honduras, Centroamérica. Nuestra oficina es
                de fácil acceso y cuenta con estacionamiento disponible para
                nuestros visitantes.
              </p>
              <div className="flex items-center space-x-4 mb-10 bg-black/20 p-4 rounded-xl backdrop-blur-sm inline-flex">
                <MapPin className="h-5 w-5 text-blue-300" />
                <span className="text-sm text-blue-200 font-mono">
                  GPS: 16.351817, -86.464353
                </span>
              </div>

              <button
                onClick={() => navigateTo("appointment-form")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white text-blue-900 rounded-xl text-lg font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <MapPin className="h-5 w-5" />
                <span>Agenda una visita</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
