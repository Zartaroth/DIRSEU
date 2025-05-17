import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Calendar, Palette, Music, Camera, Theater, Users, Mic, Globe, Users2, Music4, UserCircle, Award } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Footer from '../componentes/footer/footer';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';
import DanzaFolklorica from '../componentes/horariosTalleres/danzaFolklorica';
import DanzaModerna from '../componentes/horariosTalleres/danzaModerna';
import Teatro from '../componentes/horariosTalleres/teatro';
import Tuna from '../componentes/horariosTalleres/tuna';
import TunaFemenina from '../componentes/horariosTalleres/tunaF';
import Orquesta from '../componentes/horariosTalleres/orquesta';
import Ritmo from '../componentes/horariosTalleres/ritmo';
import Coro from '../componentes/horariosTalleres/coro';
import ArtesVisuales from '../componentes/horariosTalleres/artesVisuales';
import axios from 'axios';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';

const Workshop = ({ icon: Icon, title, description, onClick }) => (
  <motion.div 
    className="p-6 rounded-lg shadow-lg hover:shadow-xl bg-white duration-300 cursor-pointer"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);

const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="py-4">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center mb-8">
        <Icon className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

// Componente para una tarjeta con animación
const Card = ({ title, description, image, link, showLink = true }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {image && (
      <img 
        src={image} 
        alt={title} 
        className="w-full h-96 object-cover mb-4 rounded-t-lg" 
      />
    )}
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    {showLink && (
      <a href={link} className="text-blue-600 hover:underline">Más información</a>
    )}
  </motion.div>
);

const DFormativo = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [eventos, setEventos] = useState([]);

  // Detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventos/coordinador/C001`);
        
        if (Array.isArray(response.data)) {
          // Ordenamos los eventos por la cercanía a la fecha actual
          const eventosOrdenados = response.data.sort((a, b) => {
            const diffA = Math.abs(new Date(a.fecha) - new Date()); // Diferencia con la fecha actual
            const diffB = Math.abs(new Date(b.fecha) - new Date());
            return diffA - diffB; // Ordenamos de menor a mayor distancia temporal
          });
    
          // Seleccionamos los tres eventos más cercanos
          const tresMasCercanos = eventosOrdenados.slice(0, 3);
          setEventos(tresMasCercanos);
        } else {
          console.error('La respuesta de la API no es un arreglo', response.data);
        }
      } catch (err) {
        setError('Error al cargar los eventos.');
      }
    };
    fetchEventos();
  }, []);

  // Función para volver al inicio
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedWorkshop(null);
  };

  const workshops = [
    { icon: Palette, title: "Artes Visuales y Gráficas", description: "Aprende diversas técnicas de pintura y expresa tu creatividad en el lienzo." },
    { icon: Music, title: "Orquesta Sinfónica", description: "Descubre el mundo de la música instrumental a través de una variedad de instrumentos y estilos." },
    { icon: Mic, title: "Coro", description: "Explora tu voz y aprende a interpretar piezas musicales en conjunto." },
    { icon: Users2, title: "Danza Moderna", description: "Explora tu creatividad a través del movimiento y aprende coreografías contemporáneas." },
    { icon: Theater, title: "Teatro", description: "Desarrolla tus habilidades de actuación y expresión corporal en el escenario." },
    { icon: Music4, title: "Tuna Femenina", description: "Descubre el arte de la interpretación musical y la tradición de la Tuna, mientras disfrutas de la camaradería." },
    { icon: Users, title: "Danza Folclórica", description: "Expresa tus emociones a través del movimiento y aprende diversos estilos de baile tradicionales." },
    { icon: Users, title: "Ritmo y Conexión", description: "Conéctate con el ritmo y aprende a bailar en diferentes estilos, mientras compartes una experiencia social." },
    { icon: Music4, title: "Tuna Universitaria", description: "Únete a la tradición musical universitaria, donde aprenderás a interpretar canciones y a disfrutar de la música en grupo." },
  ];

  const renderModalContent = () => {
    switch (selectedWorkshop?.title) {
      case "Danza Folclórica":
        return <DanzaFolklorica />;
      case "Danza Moderna":
        return <DanzaModerna />;
      case "Teatro":
        return <Teatro />;
      case "Artes Visuales y Gráficas":
        return <ArtesVisuales />;
      case "Ritmo y Conexión":
        return <Ritmo />;
      case "Orquesta Sinfónica":
        return <Orquesta />;
      case "Coro":
        return <Coro />;
      case "Tuna Femenina":
        return <TunaFemenina />;
      case "Tuna Universitaria":
        return <Tuna />;
      default:
        return <p>Información no disponible.</p>;
    }
  };

  // Configuración de redes sociales
  const socialLinks = [
    { icon: <Facebook size={16} />, url: 'https://facebook.com', hoverColor: 'text-blue-400' },
    { icon: <Youtube size={16} />, url: 'https://youtube.com', hoverColor: 'text-red-500' },
    { icon: <Instagram size={16} />, url: 'https://instagram.com', hoverColor: 'text-pink-500' },
    { icon: <Phone size={16} />, url: 'https://wa.me/yourphonenumber', hoverColor: 'text-green-400' },
  ];

  const buttons = [
    { label: 'Inicio', href: '/' },
    { label: 'Desarrollo Formativo', href: '/Desarrollo-Formativo' },
    { label: 'Desarrollo Sostenible', href: '/Desarrollo-Sostenible' },
    { label: 'Extensión Universitaria', href: '/Extension-Universitaria' },
    { label: 'Seguimiento al Egresado', href: '/SeguimientoAlEgresado' },
  ];

  const Benefit = ({ icon: Icon, title, description }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
        {Icon && <Icon className="text-blue-500 mx-auto mb-4" size={48} />}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de Atención al Desarrollo Formativo"
          subtitle="Potencia tus habilidades creativas a través de nuestros talleres artísticos."
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>

      <main className="">
      {/* Sección de talleres */}
      <section id="talleres" className="py-0">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nuestros Talleres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((workshop, index) => (
                <Workshop 
                  key={index} 
                  icon={workshop.icon} 
                  title={workshop.title} 
                  description={workshop.description} 
                  onClick={() => openModal(workshop)} 
                />
              ))}
            </div>
          </div>
        </section>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-3xl mx-auto">
              <button 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
                onClick={closeModal}
              >
                X
              </button>
              {renderModalContent()}
            </div>
          </div>
        )}

        <section id="beneficios" className="py-0">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Beneficios de Nuestros Talleres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Benefit 
                icon={UserCircle}  // Icono de desarrollo personal
                title="Desarrollo Personal" 
                description="Potencia tu creatividad y habilidades de expresión." 
              />
              <Benefit 
                icon={Users}  // Icono de desarrollo social
                title="Desarrollo Social" 
                description="Conecta con otros estudiantes." 
              />
              <Benefit 
                icon={Award}  // Icono de becas
                title="Becas" 
                description="Puede aplicar a medias becas o becas completas dependiendo de su participación." 
              />
            </div>
          </div>
        </section>
        <Section id="eventos" title="Próximos Eventos" icon={Calendar}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(eventos) && 
              eventos.map((evento) => (
                <Card
                  key={evento.id}
                  title={evento.nombre}
                  description={evento.descripcion}
                  image={`http://localhost:4000${evento.imagen}`} // Concatenamos la URL base con la ruta de la imagen
                  showLink={false}
                />
              ))
            }
          </div>
        </Section>
      </main>


      <footer id="footer" className="py-6 bg-gray-800 text-white">
        <Footer />
      </footer>
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DFormativo;