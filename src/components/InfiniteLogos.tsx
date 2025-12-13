import { useEffect, useState } from "react";
import { fetchLogosFromSheet, LogoItem } from "../lib/logos";

const InfiniteLogos = () => {
  const [logos, setLogos] = useState<LogoItem[]>([]);

  useEffect(() => {
    fetchLogosFromSheet().then((data) => {
      setLogos(data);
    });
  }, []);

  if (!logos.length) return null;

  // Repetir logos hasta cubrir 3 pantallas para evitar espacios en blanco
  const minLogos = Math.ceil(36 / (logos.length || 1));
  const logosInfinite = Array(minLogos).fill(logos).flat();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 overflow-hidden relative">
      {/* Efectos decorativos de fondo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      <div className="relative z-10">
        {/* Título del carrusel */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Nuestros Clientes
          </h3>
          <p className="text-gray-600 text-sm">Empresas que confían en nosotros</p>
        </div>

        {/* Carrusel con efecto de desvanecimiento en los bordes */}
        <div className="relative">
          {/* Gradientes de desvanecimiento */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Contenedor del scroll */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-16 animate-scroll-infinite hover:animation-pause"
              style={{ minWidth: "300%" }}
            >
              {logosInfinite.map((logo, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center h-28 group"
                >
                  <a
                    href={
                      logo.web.startsWith("http") ? logo.web : `https://${logo.web}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative transition-transform duration-300 hover:scale-110"
                  >
                    {/* Efecto de brillo al hacer hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    
                    {/* Logo con fondo sutil */}
                    <div className="relative bg-white rounded-xl p-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-300">
                      <img
                        src={logo.imagen}
                        alt={`logo-${idx}`}
                        className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 filter group-hover:brightness-110"
                        style={{ maxHeight: 64, maxWidth: 160 }}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="flex justify-center mt-6 gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-66.666%); }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 150s linear infinite;
        }
        .hover\:animation-pause:hover {
          animation-play-state: paused;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default InfiniteLogos;
