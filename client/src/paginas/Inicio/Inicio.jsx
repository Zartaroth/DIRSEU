import React, { useRef, useState, useEffect } from 'react';
import { LuUsers, LuHeart, LuMail, LuBriefcase, LuGlobe } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import MissionVisionCards from '../componentes/cardMV/cardMV';

import { ArrowUp, Facebook, Youtube, Instagram, Phone, Calendar } from 'lucide-react';

import Footer from '../componentes/footer/footer';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Politicas from '../componentes/politicas/politicas';
import Coordinaciones from '../componentes/queHacenCoor/hacerCoordinaciones';
import Programas from './Voluntariados';
import Capacitaciones from './CapacitacionesCarrusel';
import Talleres from './TalleresCarrusel';
import axios from 'axios';

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

const Inicio = () => {
  const conocemasRef = useRef(null);
  const programasRef = useRef(null);
  const impactoRef = useRef(null);
  const contactoRef = useRef(null);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);

  // Detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver al inicio
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventos`);
        
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

  // Configuración de redes sociales
  const socialLinks = [
    { icon: <Facebook size={16} />, url: 'https://www.facebook.com/profile.php?id=61554687909365', hoverColor: 'text-blue-400' },
    { icon: <Youtube size={16} />, url: 'https://www.youtube.com/@CuscoUAndina', hoverColor: 'text-red-500' },
    { icon: <Instagram size={16} />, url: 'https://instagram.com', hoverColor: 'text-pink-500' },
    { icon: <Phone size={16} />, url: 'https://wa.me/yourphonenumber', hoverColor: 'text-green-400' },
  ];


  const buttons=[
    { label: 'Desarrollo Formativo', href: '/Desarrollo-Formativo' },
    { label: 'Desarrollo Sostenible', href: '/Desarrollo-Sostenible' },
    { label: 'Extensión Universitaria', href: '/Extension-Universitaria' },
    { label: 'Seguimiento al Egresado', href: '/SeguimientoAlEgresado' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Responsabilidad Social y Extensión Universitaria"
          subtitle="Construyendo puentes entre la universidad y la comunidad para un futuro mejor."
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>

      <main className="">
        {/* Nueva sección de Misión y Visión */}
        <section ref={conocemasRef} id="conocemas" className="w-full md:py-12 lg:py-12 bg-gray-100">
          <div className="container mx-auto px-1 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 mx-auto">
            Nuestra Misión y Visión
          </h2>
          <MissionVisionCards
            mission="La Dirección de Responsabilidad Social y Extensión Universitaria de la Universidad Andina del Cusco planifica, organiza y dirige las actividades de responsabilidad social y extensión universitaria, promoviendo y articulando las iniciativas de los estudiantes, docentes, egresados y graduados de la Universidad Andina del Cusco, para contribuir al desarrollo sostenible de la comunidad local, regional y nacional."
            vision="La Dirección de Responsabilidad Social y Extensión Universitaria de la Universidad Andina del Cusco al 2025, será líder en la gestión ética y eficaz del impacto generado por la universidad contribuyendo al desarrollo sostenible de la sociedad, en base al ejercicio de sus funciones sustantivas de formación profesional, de investigación, de servicios de extensión y proyección social."
          />
          </div>
        </section>
        <section className="py-0 bg-gray-100">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 mx-auto">
            Nuestras Coordinaciones
          </h2>
          <Coordinaciones />
        </section>
        {/* Seccion de politicas */}
        <section className="py-0 md:py-0 lg:py-0 bg-gray-100 min-h-screen">
          <Politicas />
        </section>

        {/* Sección de Programas */}
        <section ref={programasRef} id="programas" className="w-full py-12 md:py-12 lg:py-16 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              Nuestros Programas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuUsers className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Voluntariado</h3>
                <p className="text-gray-600 mb-6">
                  Oportunidades para aprender y contribuir de manera significativa al bienestar comunitario.
                </p>
                <Programas />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuHeart className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Talleres</h3>
                <p className="text-gray-600 mb-6">
                  Espacios creativos donde puedes explorar diversas disciplinas artísticas y desarrollar tu talento.
                </p>
                <Talleres />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuBriefcase className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Desarrollo Profesional</h3>
                <p className="text-gray-600 mb-6">
                  Oportunidades de aprendizaje enfocadas en mejorar y potenciar tus habilidades profesionales.
                </p>
                <Capacitaciones />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuGlobe className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Desarrollo Sostenible</h3>
                <p className="text-gray-600 mb-6">
                  Programas dedicados a fomentar la sostenibilidad y crear un impacto ambiental positivo y duradero.
                </p>
                {/* <DesarrolloSostenible /> */}
              </div>
            </div>
          </div>
        </section>
        <Section id="eventos" title="Próximos Eventos" icon={Calendar}>
          {error && <div>{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(eventos) && 
              eventos.map((evento) => (
                <Card
                  key={evento.id}
                  title={evento.nombre}
                  description={evento.descripcion}
                  image={`${import.meta.env.VITE_API_URL}${evento.imagen}`} // Concatenamos la URL base con la ruta de la imagen
                  showLink={false}
                />
              ))
            }
          </div>
        </Section>
      </main>

      <footer ref={contactoRef} id="footer" className="py-6 bg-gray-800 text-white">
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

export default Inicio;
