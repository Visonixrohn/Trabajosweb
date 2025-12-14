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

  // Repetir logos para el efecto infinito
  const minLogos = Math.ceil(36 / (logos.length || 1));
  const logosInfinite = Array(minLogos).fill(logos).flat();

  return (
    <div className="w-full bg-slate-950 py-24 overflow-hidden relative group perspective-1000">
      {/* Background Cyber Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-32 bg-blue-600/20 blur-[100px] -rotate-12 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header - Floating & Glowing */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-600/30 rounded-full blur-[50px] animate-pulse-slow"></div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display tracking-tight relative z-10">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Aliados</span>
          </h3>
          <p className="text-blue-200/60 text-lg font-light tracking-wide uppercase">Empresas que impulsan el futuro</p>
        </div>

        {/* Carousel Container - The "Energy Stream" */}
        <div className="relative py-10 bg-gradient-to-r from-transparent via-slate-900/50 to-transparent backdrop-blur-sm border-y border-blue-500/10">

          {/* Glowing Track Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_10px_#06b6d4]"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50 shadow-[0_0_10px_#8b5cf6]"></div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

          {/* Infinite Scroll Track */}
          <div className="flex w-max animate-scroll-infinite hover:animation-pause">
            {logosInfinite.map((logo, idx) => (
              <div
                key={idx}
                className="mx-8 relative group/card"
              >
                <a
                  href={
                    logo.web.startsWith("http") ? logo.web : `https://${logo.web}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative p-1"
                >
                  {/* Holographic Projection Base */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 blur-[2px]"></div>

                  {/* Glass Card */}
                  <div className="w-48 h-32 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md group-hover/card:bg-white/10 group-hover/card:border-white/20 transition-all duration-300 transform group-hover/card:-translate-y-2 group-hover/card:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)] relative overflow-hidden">

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover/card:animate-scanline pointer-events-none"></div>

                    {/* Logo */}
                    <img
                      src={logo.imagen}
                      alt={`logo-${idx}`}
                      className="h-16 w-auto object-contain transition-all duration-500 filter brightness-200 grayscale opacity-70 group-hover/card:brightness-100 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-110"
                      style={{ maxHeight: 60, maxWidth: 140 }}
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Particles/Indicators */}
        <div className="flex justify-center mt-12 gap-3">
          <span className="w-16 h-1 bg-blue-500/20 rounded-full overflow-hidden">
            <div className="w-full h-full bg-blue-500 animate-slide-right"></div>
          </span>
          <span className="w-16 h-1 bg-violet-500/20 rounded-full overflow-hidden">
            <div className="w-full h-full bg-violet-500 animate-slide-right [animation-delay:0.5s]"></div>
          </span>
          <span className="w-16 h-1 bg-cyan-500/20 rounded-full overflow-hidden">
            <div className="w-full h-full bg-cyan-500 animate-slide-right [animation-delay:1s]"></div>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scroll-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 60s linear infinite;
        }
        .animate-scroll-infinite:hover {
            animation-play-state: paused;
        }
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .animate-scanline {
            animation: scanline 1.5s linear infinite;
        }
        @keyframes slide-right {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-slide-right {
            animation: slide-right 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteLogos;
