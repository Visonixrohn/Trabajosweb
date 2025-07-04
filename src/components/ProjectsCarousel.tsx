import React, { useState, useEffect } from "react";
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

  return (
    <section className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with play/pause control */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Proyectos Innovadores
          </h2>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 group"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main carousel container */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10">
            {/* Carousel track */}
            <div
              className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div key={index} className="relative w-full flex-shrink-0">
                  <div className="relative flex justify-center items-center h-[320px] md:h-[340px] lg:h-[360px] xl:h-[380px] 2xl:h-[400px] overflow-hidden">
                    <img
                      src={project.imagen}
                      alt={project.negocio}
                      className="object-contain max-h-full max-w-full rounded-xl shadow-lg bg-white"
                      style={{
                        width: "auto",
                        height: "100%",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        margin: "0 auto",
                        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
                      }}
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                    <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                        {project.negocio}
                      </h3>
                      <p className="text-lg lg:text-xl text-white/90 drop-shadow-lg max-w-2xl leading-relaxed">
                        {project.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Slide number indicator */}
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium border border-white/30">
                    {index + 1} / {projects.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 lg:p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 opacity-0 group-hover:opacity-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 lg:p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 opacity-0 group-hover:opacity-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </button>

          {/* Modern dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  current === index
                    ? "w-12 h-3 bg-gradient-to-r from-blue-400 to-purple-400"
                    : "w-3 h-3 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              >
                {current === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-200 ease-linear"
              style={{
                width: `${((current + 1) / projects.length) * 100}%`,
                background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
