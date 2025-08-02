import React, { useState, useEffect } from "react";
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
    <section className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 mb-12 text-center">
          Proyectos Innovadores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 border border-blue-100/30 cursor-pointer"
              onClick={() =>
                navigateTo({ type: "project-detail", negocio: project.negocio })
              }
              title={`Ver detalle de ${project.negocio}`}
            >
              <div className="w-full flex justify-center items-center h-40 mb-4">
                <img
                  src={project.imagen}
                  alt={project.negocio}
                  className="object-contain max-h-full max-w-full rounded-xl shadow-lg bg-white"
                  style={{ maxHeight: 120, maxWidth: 180 }}
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2 text-center">
                {project.negocio}
              </h3>
              <p className="text-base text-gray-700 text-center mb-2">
                {project.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
