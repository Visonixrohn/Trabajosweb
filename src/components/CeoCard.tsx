import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { useRouter } from "../contexts/RouterContext";
import { User } from "lucide-react";

const CeoCard = () => {
  const { navigateTo } = useRouter();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 cursor-pointer"
          onClick={() => navigateTo("CeoBiografia")}
        >
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white transition-transform duration-300 group-hover:scale-110">
            <User className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              CEO
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Miguel Angel Romeo Guillen
            </p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        sideOffset={8}
        className="text-center w-80"
      >
        <div className="flex flex-col items-center">
          <img
            src="/perf.png"
            alt="Miguel Ángel Romero Guillén"
            className="h-20 w-20 rounded-full border-2 border-white shadow mb-2 object-cover"
          />
          <h4 className="text-lg font-bold text-gray-900 mb-1">
            Miguel Ángel Romero Guillén
          </h4>
          <span className="text-blue-600 text-sm font-medium mb-2">
            Desarrollador y Emprendedor Hondureño
          </span>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            Soy un desarrollador y emprendedor hondureño apasionado por la
            tecnología y la innovación digital. Con más de 3 años de experiencia
            en programación, diseño web y desarrollo de aplicaciones, me
            especializo en crear páginas web modernas y aplicaciones funcionales
            en AppSheet que impulsan a negocios y emprendedores.
          </p>
          <button
            className="mt-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-medium shadow hover:from-purple-600 hover:to-purple-700 transition-colors"
            onClick={() => navigateTo("CeoBiografia")}
          >
            Ver biografía completa
          </button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CeoCard;
