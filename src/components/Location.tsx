import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

// Coordenadas exactas proporcionadas
const center = {
  lat: 16.351817,
  lng: -86.464353
};

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '16px'
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
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [{ weight: '2.00' }]
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#9c9c9c' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ color: '#f2f2f2' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ saturation: -100 }, { lightness: 45 }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#eeeeee' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#7b7b7b' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [{ visibility: 'simplified' }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#c8d7d4' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#070707' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    }
  ]
};

const Location = () => {
  const { t } = useLanguage();
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Dirección',
      value: t.location.address,
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: t.location.phone,
      color: 'text-green-600'
    },
    {
      icon: Mail,
      label: 'Email',
      value: t.location.email,
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      label: 'Horario',
      value: t.location.hours,
      color: 'text-orange-600'
    }
  ];

  return (
    <section id="location" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t.location.title}
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {t.location.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.label}</h4>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">¿Cómo llegar?</h3>
              <p className="text-blue-100 mb-6">
                Estamos ubicados en Honduras, Centroamérica. Nuestra oficina es de fácil acceso 
                y cuenta con estacionamiento disponible para nuestros visitantes.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-200" />
                  <span className="text-sm text-blue-200">GPS: 16.351817, -86.464353</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nuestra Ubicación</h3>
            
            <LoadScript googleMapsApiKey="AIzaSyBWXNE96Eb23e16DCw7Zfb9rkYwxRiTUfQ">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                options={mapOptions}
              >
                <Marker
                  position={center}
                  onClick={() => setShowInfoWindow(!showInfoWindow)}
                  icon={{
                    url: 'data:image/svg+xml;base64,' + btoa(`
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="12" fill="#2563eb" stroke="#ffffff" stroke-width="3"/>
                        <circle cx="16" cy="16" r="6" fill="#ffffff"/>
                      </svg>
                    `),
                    scaledSize: window.google?.maps ? new window.google.maps.Size(32, 32) : undefined,
                    anchor: window.google?.maps ? new window.google.maps.Point(16, 16) : undefined
                  }}
                />
                
                {showInfoWindow && (
                  <InfoWindow
                    position={center}
                    onCloseClick={() => setShowInfoWindow(false)}
                  >
                    <div className="p-2 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <img src="/logo.png" alt="VISONIXRO" className="h-8 w-auto" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">VISONIXRO</h4>
                      <p className="text-sm text-gray-600">Oficina Principal</p>
                      <p className="text-xs text-gray-500 mt-1">Honduras, Centroamérica</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>

            {/* Map Controls Info */}
            <div className="mt-4 text-sm text-gray-600">
              <p>💡 Haz clic en el marcador para más información</p>
              <p>🗺️ Usa los controles del mapa para navegar</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 cursor-pointer">
            <MapPin className="h-5 w-5" />
            <span>Agenda una visita</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
