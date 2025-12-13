import { useState, useEffect } from "react";
import { useRouter } from "../contexts/RouterContext";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { fetchProjectsFromSheet } from "../lib/fetchSheetData";

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProjectsFromSheet()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("No se pudieron cargar los proyectos.");
        setLoading(false);
      });
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!projects.length || !isPlaying || isPaused) return;

    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [current, isAnimating, projects.length, isPlaying, isPaused]);

  const handleNext = () => {
    if (isAnimating || !projects.length) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePrev = () => {
    if (isAnimating || !projects.length) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded-lg w-64 mx-auto mb-8"></div>
            <div className="h-96 bg-white/10 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Proyectos Innovadores
          </h2>
          <div className="text-red-400 bg-red-900/30 p-4 rounded-lg border border-red-500/30">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return null;
  }

  const { navigateTo } = useRouter();

  return (
    <section
      id="projects-carousel"
      className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 relative overflow-hidden"
    >
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Título mejorado con efectos */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <h2 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-4 animate-gradient">
              Proyectos Innovadores
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Transformando ideas en experiencias digitales excepcionales
          </p>
        </div>

        {/* Grid de proyectos mejorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden hover:shadow-blue-500/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              onClick={() =>
                navigateTo({ type: "project-detail", negocio: project.negocio })
              }
              title={`Ver detalle de ${project.negocio}`}
            >
              {/* Borde gradiente animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl p-[2px]">
                <div className="bg-white rounded-3xl w-full h-full"></div>
              </div>
              
              <div className="relative p-6 flex flex-col items-center h-full">
                {/* Contenedor de imagen mejorado */}
                <div className="w-full flex justify-center items-center h-44 mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={project.imagen}
                    alt={project.negocio}
                    className="relative object-contain max-h-full max-w-full rounded-xl transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                    style={{ maxHeight: 140, maxWidth: 200 }}
                  />
                </div>

                {/* Contenido del proyecto */}
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-purple-900 mb-3 text-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {project.negocio}
                    </h3>
                    <p className="text-base text-gray-600 text-center leading-relaxed">
                      {project.descripcion.length > 100
                        ? project.descripcion.slice(0, 100) + "..."
                        : project.descripcion}
                    </p>
                  </div>
                  
                  {/* Botón de ver más */}
                  <div className="mt-4 pt-4 border-t border-gray-200 group-hover:border-blue-300 transition-colors">
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition-colors flex items-center justify-center gap-2">
                      Ver más detalles
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animación de gradiente */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectsCarousel;
