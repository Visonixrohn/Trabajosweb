import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { useRouter } from "../contexts/RouterContext";
import { User } from "lucide-react";
import React from "react";

interface CeoCardProps {
  alwaysShowModal?: boolean;
  cardClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
}

const CeoCard: React.FC<CeoCardProps> = ({
  alwaysShowModal = false,
  cardClassName = "group flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-violet-500/50 transition-all duration-500 hover:transform hover:-translate-y-1 hover:bg-white/10 cursor-pointer",
  iconClassName = "p-4 rounded-xl bg-violet-500/10 text-violet-400 transition-transform duration-300 group-hover:scale-110",
  titleClassName = "text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300",
}) => {
  const { navigateTo } = useRouter();

  const cardContent = (
    <div className={cardClassName}>
      <div className={iconClassName}>
        <User className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h3 className={titleClassName}>CEO</h3>
        <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
          Miguel Angel Romeo Guillen
        </p>
      </div>
    </div>
  );

  const modalContent = (
    <div className="text-center w-80 mx-auto mt-4 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-xl">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-violet-600 rounded-full blur-md opacity-20"></div>
          <img
            src="/perf.png"
            alt="Miguel Ángel Romero Guillén"
            className="relative h-24 w-24 rounded-full border-2 border-violet-500 shadow-lg object-cover"
          />
        </div>

        <h4 className="text-lg font-bold text-white mb-1">
          Miguel Ángel Romero Guillén
        </h4>
        <span className="text-violet-400 text-sm font-medium mb-4 block">
          Desarrollador y Emprendedor Hondureño
        </span>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          Soy un desarrollador y emprendedor hondureño apasionado por la
          tecnología y la innovación digital. Con más de 3 años de experiencia
          en programación, diseño web y desarrollo de aplicaciones.
        </p>
        <button
          className="w-full px-4 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-violet-100 transition-all duration-300 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            navigateTo("CeoBiografia");
          }}
        >
          Ver biografía completa
        </button>
      </div>
    </div>
  );

  if (alwaysShowModal) {
    return (
      <div>
        {cardContent}
        {modalContent}
      </div>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div onClick={() => navigateTo("CeoBiografia")}>{cardContent}</div>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        sideOffset={8}
        className="w-80 p-0 border-none bg-transparent shadow-none"
      >
        {modalContent}
      </HoverCardContent>
    </HoverCard>
  );
};

export default CeoCard;
