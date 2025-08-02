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
    return <div className="p-10 text-center text-lg">Cargando proyecto...</div>;
  }
  if (error || !project) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Proyecto no encontrado."}
      </div>
    );
  }

  return (
    <section className="w-full min-h-[60vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center">
        <img
          src={project.imagen}
          alt={project.negocio}
          className="object-contain max-h-60 max-w-full rounded-xl shadow-lg mb-6 bg-white"
        />
        <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">
          {project.negocio}
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
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
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-cyan-600 transition-colors font-semibold"
        >
          ← Volver a la sección de proyectos
        </button>
      </div>
    </section>
  );
};

export default ProjectBioPage;
