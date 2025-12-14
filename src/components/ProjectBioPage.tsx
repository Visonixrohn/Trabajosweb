import { useEffect, useState } from "react";
import { fetchProjectsFromSheet, Project } from "../lib/fetchSheetData";

interface ProjectBioPageProps {
  negocio: string;
}

import { useRouter } from "../contexts/RouterContext";

const ProjectBioPage: React.FC<ProjectBioPageProps> = ({ negocio }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { goHome } = useRouter();

  useEffect(() => {
    fetchProjectsFromSheet()
      .then((projects) => {
        const found = projects.find((p) => p.negocio === negocio);
        setProject(found || null);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar el proyecto.");
        setLoading(false);
      });
  }, [negocio]);

  if (loading) {
    return <div className="p-10 text-center text-lg text-white">Cargando proyecto...</div>;
  }
  if (error || !project) {
    return (
      <div className="p-10 text-center text-red-400">
        {error || "Proyecto no encontrado."}
      </div>
    );
  }

  return (
    <section className="w-full min-h-[60vh] bg-slate-950 py-20 flex justify-center items-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center relative z-10">
        <img
          src={project.imagen}
          alt={project.negocio}
          className="object-contain max-h-60 max-w-full rounded-xl shadow-lg mb-6 bg-slate-900 border border-white/10"
        />
        <h1 className="text-4xl font-bold text-white mb-4 text-center font-display">
          {project.negocio}
        </h1>
        <p className="text-lg text-gray-300 text-center mb-6 font-light">
          {project.descripcion}
        </p>
        <button
          onClick={() => {
            goHome();
            // Esperar a que la navegación termine y el DOM esté listo
            setTimeout(() => {
              const el = document.getElementById("projects-carousel");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                // Si no existe, intentar de nuevo tras un pequeño delay
                setTimeout(() => {
                  const el2 = document.getElementById("projects-carousel");
                  if (el2) {
                    el2.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }, 400);
              }
            }, 400);
          }}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:from-blue-700 hover:to-violet-700 transition-all font-semibold hover:scale-105"
        >
          ← Volver a la sección de proyectos
        </button>
      </div>
    </section>
  );
};

export default ProjectBioPage;
