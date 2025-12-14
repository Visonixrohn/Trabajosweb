import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { Globe, Smartphone, Wrench, Layout, Zap } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingSocialButton from "./FloatingSocialButton";

const CeoBiografia = () => {
  return (
    <>
      <div className="relative z-50" id="CeoBiografia">
        <Navbar />
      </div>
      <main>
        <section className="min-h-screen bg-slate-950 py-24 px-4 relative overflow-hidden">

          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
            {/* Card principal */}
            <div className="relative rounded-3xl p-10 text-white shadow-2xl bg-white/5 backdrop-blur-md border border-white/10 z-10">
              {/* Logo */}
              <div className="mb-12 text-center">
                <img
                  src="/logo.png"
                  alt="VISONIXRO"
                  className="h-40 w-auto mx-auto drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 transition-transform duration-300 animate-spin-custom"
                />
              </div>

              {/* Foto de perfil */}
              <div className="mb-8 text-center">
                <div className="inline-block relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <img
                    src="/perf.png"
                    alt="Miguel Ángel Romero Guillén"
                    className="relative h-64 w-64 md:h-80 md:w-80 rounded-full border-4 border-white/20 shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Nombre y título */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-white font-display">
                Miguel Ángel Romero Guillén
              </h1>
              <h2 className="text-xl text-center text-blue-400 font-medium mb-10 tracking-wide">
                Desarrollador y Emprendedor Hondureño
              </h2>

              {/* Biografía */}
              <div className="bg-white/5 backdrop-blur-sm text-gray-300 rounded-2xl p-8 space-y-6 leading-relaxed border border-white/10 max-w-4xl mx-auto text-lg font-light">
                <p>
                  Soy un desarrollador y emprendedor hondureño apasionado por la
                  tecnología y la innovación digital. Con más de 3 años de
                  experiencia en programación, diseño web y desarrollo de
                  aplicaciones, me especializo en crear páginas web modernas y
                  aplicaciones funcionales en AppSheet que impulsan a negocios y
                  emprendedores.
                </p>
                <p>
                  Mi enfoque es ofrecer soluciones personalizadas, accesibles y
                  efectivas. Desde tiendas en línea hasta sistemas de gestión en
                  AppSheet, combino diseño atractivo y funcionalidad para lograr
                  resultados que realmente impactan.
                </p>
                <p>
                  Mi misión es clara: ayudar a empresas y emprendedores a
                  digitalizarse de forma rápida, sencilla y rentable,
                  aprovechando el poder de la tecnología.
                </p>
              </div>

              {/* Especialidades */}
              <div className="mt-16">
                <h3 className="text-3xl font-bold text-white mb-12 text-center font-display">
                  Especialidades
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible">
                  {[
                    {
                      icon: Globe,
                      title: "Desarrollo de páginas web profesionales",
                      color: "text-blue-400",
                      bg: "bg-blue-500/10",
                      border: "group-hover:border-blue-500/50",
                      benefits: [
                        "Presencia online sólida y confiable para tu negocio.",
                        "Diseño moderno que refleja la identidad de tu marca.",
                        "Compatibilidad con todos los navegadores y dispositivos.",
                        "Carga rápida y optimizada para mejorar la experiencia del usuario.",
                        "Integración con herramientas como pagos en línea, reservas y chat en vivo.",
                        "Estructura lista para posicionarse en Google (SEO friendly).",
                        "Mantenimiento y actualizaciones constantes para mantener la web segura y vigente.",
                      ],
                    },
                    {
                      icon: Smartphone,
                      title: "Creación de aplicaciones en AppSheet",
                      color: "text-green-400",
                      bg: "bg-green-500/10",
                      border: "group-hover:border-green-500/50",
                      benefits: [
                        "Aplicaciones rápidas sin necesidad de programación compleja.",
                        "Perfectas para gestionar datos y operaciones desde cualquier lugar.",
                        "Acceso desde celular, tablet o computadora.",
                        "Sin límites de ubicación: trabaja en tiempo real desde cualquier parte del mundo.",
                        "Integración directa con Google Sheets, Excel y bases de datos online.",
                        "Funcionalidades personalizadas según las necesidades de tu negocio.",
                        "Reducción de costos de desarrollo frente a apps tradicionales.",
                      ],
                    },
                    {
                      icon: Layout,
                      title: "Diseño funcional y responsive",
                      color: "text-purple-400",
                      bg: "bg-purple-500/10",
                      border: "group-hover:border-purple-500/50",
                      benefits: [
                        "Experiencia de usuario fluida en cualquier tamaño de pantalla.",
                        "Diseño que se adapta automáticamente a móviles, tablets y computadoras.",
                        "Mejor accesibilidad para clientes con diferentes dispositivos.",
                        "Mayor retención de visitantes gracias a una navegación intuitiva.",
                        "Incremento de conversiones gracias a un diseño optimizado.",
                        "Cumplimiento de estándares modernos de usabilidad.",
                      ],
                    },
                    {
                      icon: Wrench,
                      title: "Soluciones digitales personalizadas",
                      color: "text-orange-400",
                      bg: "bg-orange-500/10",
                      border: "group-hover:border-orange-500/50",
                      benefits: [
                        "Herramientas creadas específicamente para tu modelo de negocio.",
                        "Mayor eficiencia y reducción de tareas repetitivas.",
                        "Integración con sistemas y plataformas que ya usas.",
                        "Escalabilidad: crece junto con tu empresa.",
                        "Procesos adaptados a tu equipo y flujo de trabajo.",
                        "Ahorro de tiempo y recursos gracias a la automatización.",
                      ],
                    },
                    {
                      icon: Zap,
                      title: "Optimización de procesos con tecnología",
                      color: "text-rose-400",
                      bg: "bg-rose-500/10",
                      border: "group-hover:border-rose-500/50",
                      benefits: [
                        "Menos errores humanos gracias a procesos automatizados.",
                        "Mayor velocidad en la ejecución de tareas diarias.",
                        "Monitoreo y control en tiempo real de datos y resultados.",
                        "Informes y métricas para una mejor toma de decisiones.",
                        "Reducción de costos operativos.",
                        "Mejor coordinación entre áreas y equipos de trabajo.",
                        "Más tiempo para enfocarte en el crecimiento de tu negocio.",
                      ],
                    },
                  ].map((item, i) => {
                    const [show, setShow] = React.useState(false);
                    const [modalPos, setModalPos] = React.useState({
                      top: 0,
                      left: 0,
                    });
                    const cardRef = useRef<HTMLDivElement>(null);

                    const handleShow = () => {
                      if (cardRef.current) {
                        const rect = cardRef.current.getBoundingClientRect();
                        setModalPos({
                          top: rect.bottom + window.scrollY + 8,
                          left: rect.left + rect.width / 2 + window.scrollX,
                        });
                      }
                      setShow(true);
                    };
                    const handleHide = () => setShow(false);

                    return (
                      <div
                        key={i}
                        ref={cardRef}
                        className={`relative bg-white/5 border border-white/10 ${item.border} rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer group`}
                        onMouseEnter={handleShow}
                        onMouseLeave={handleHide}
                        onClick={() => (show ? handleHide() : handleShow())}
                      >
                        <div
                          className={`flex items-center justify-center w-16 h-16 rounded-xl mx-auto mb-5 ${item.bg} ${item.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                        >
                          <item.icon className="w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-white text-lg">
                          {item.title}
                        </h4>
                        {/* Modal flotante de beneficios usando portal */}
                        {show &&
                          typeof window !== "undefined" &&
                          createPortal(
                            <div
                              className="z-[9999] w-80 bg-slate-900 border border-white/20 rounded-xl shadow-2xl p-6 text-left animate-fade-in backdrop-blur-xl"
                              style={{
                                position: "absolute",
                                top: modalPos.top,
                                left: modalPos.left,
                                transform: "translate(-50%, 0)",
                                maxWidth: "90vw",
                              }}
                            >
                              <h5 className="font-bold text-white mb-3 text-lg border-b border-white/10 pb-2">
                                Beneficios
                              </h5>
                              <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                                {item.benefits.map((b, j) => (
                                  <li key={j}>{b}</li>
                                ))}
                              </ul>
                            </div>,
                            document.body
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Animación lenta del borde de imagen */}
          <style>
            {`
              @keyframes spin-custom {
                0% { transform: rotateY(0deg); }
                50% { transform: rotateY(360deg); }
                100% { transform: rotateY(720deg); }
              }
              .animate-spin-custom {
                animation: spin-custom 2s linear infinite;
                transform-style: preserve-3d;
                /* 0-1s rápido, 11-2s lento */
                animation-timing-function: cubic-bezier(0.7,0,1,1), cubic-bezier(0.2,1,0.3,1);
              }
            `}
          </style>
        </section>
      </main>

      <Footer />
      <FloatingSocialButton />
    </>
  );
};

export default CeoBiografia;
