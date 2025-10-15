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
      color: "text-blue-600",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: t.location.phone,
      color: "text-green-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: t.location.email,
      color: "text-purple-600",
    },
    {
      icon: Clock,
      label: "Horario",
      value: t.location.hours,
      color: "text-orange-600",
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Contact Information */}
          <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Información de Contacto
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.label}
                    </h4>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">¿Cómo llegar?</h3>
            <p className="text-blue-100 mb-6">
              Estamos ubicados en Honduras, Centroamérica. Nuestra oficina es
              de fácil acceso y cuenta con estacionamiento disponible para
              nuestros visitantes.
            </p>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-blue-200" />
              <span className="text-sm text-blue-200">
                GPS: 16.351817, -86.464353
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigateTo("appointment-form")}
            className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MapPin className="h-5 w-5" />
            <span>Agenda una visita</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Location;
