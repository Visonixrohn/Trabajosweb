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
      <section className="w-full bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-white/10 rounded-lg w-64 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="h-80 bg-white/5 rounded-3xl"></div>
              <div className="h-80 bg-white/5 rounded-3xl"></div>
              <div className="h-80 bg-white/5 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Proyectos Innovadores
          </h2>
          <div className="text-red-400 bg-red-900/10 p-4 rounded-xl border border-red-500/20 inline-block">
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
      className="w-full bg-slate-950 py-24 relative overflow-hidden text-white"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />


      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Proyectos Destacados
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light">
            Transformando ideas audaces en realidades digitales exitosas.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              onClick={() =>
                navigateTo({ type: "project-detail", negocio: project.negocio })
              }
            >
              <div className="relative p-6 flex flex-col h-full">
                {/* Image Container */}
                <div className="w-full flex justify-center items-center h-48 mb-6 relative bg-white/5 rounded-2xl overflow-hidden group-hover:bg-white/10 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={project.imagen}
                    alt={project.negocio}
                    className="relative object-contain max-h-full max-w-full transform group-hover:scale-110 transition-transform duration-500"
                    style={{ maxHeight: 140, maxWidth: 200 }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {project.negocio}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                      {project.descripcion}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                    <span className="text-blue-400 font-medium group-hover:text-white transition-colors">Ver Detalles</span>
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-600 transition-colors">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
