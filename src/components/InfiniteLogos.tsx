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
    <div className="w-full bg-white py-6 overflow-hidden border-b border-gray-100">
      <div className="relative">
        <div
          className="flex gap-12 animate-scroll-infinite"
          style={{ minWidth: "300%" }}
        >
          {logosInfinite.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center h-20">
              <a
                href={
                  logo.web.startsWith("http") ? logo.web : `https://${logo.web}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={logo.imagen}
                  alt={`logo-${idx}`}
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  style={{ maxHeight: 64, maxWidth: 160 }}
                />
              </a>
            </div>
          ))}
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
      `}</style>
    </div>
  );
};

export default InfiniteLogos;
