import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Calendar, BookOpen, Briefcase, Users, Mail, Phone, Book, FileText, Scale, Microscope, Search } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import { Facebook, Youtube, Instagram } from 'lucide-react';
import Convenios from './componentes/convenios';
import Footer from '../componentes/footer/footer';
import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Separador from '../componentes/separador';
import axios from 'axios';

// Sección reutilizable con icono y título
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

const SEgresado = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [empleos, setEmpleos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const recursos = [
    { id: 'formatos', title: 'Formatos', icon: FileText, link: '#formatos' },
    { id: 'resoluciones', title: 'Resoluciones', icon: Book, link: '#resoluciones' },
    { id: 'reglamentos', title: 'Reglamentos', icon: Scale, link: '#reglamentos' },
    { id: 'investigacion', title: 'Investigación', icon: Microscope, link: '#investigacion' },
    { id: 'turnitin', title: 'Turnitin', icon: Search, link: '#turnitin' },
  ];

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
    const fetchCapacitaciones = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/capacitaciones/`);
        if (Array.isArray(response.data)) {
          const capacitacionesOrdenadas = response.data.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
          const tresMasRecientes = capacitacionesOrdenadas.slice(0, 3);
          setCapacitaciones(tresMasRecientes);
        } else {
          console.error('La respuesta de la API no es un arreglo', response.data);
        }
      } catch (err) {
        setError('Error al cargar las capacitaciones.');
      } finally {
        setLoading(false);
      }
    };
  
    const fetchEmpleos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/empleos/`);
        if (Array.isArray(response.data)) {
          const empleosOrdenados = response.data.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
          const tresMasRecientes = empleosOrdenados.slice(0, 3);
          setEmpleos(tresMasRecientes);
        } else {
          console.error('La respuesta de la API no es un arreglo', response.data);
        }
      } catch (err) {
        setError('Error al cargar los empleos.');
      }
    };
  
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventos/coordinador/C004`);
        
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
  
    fetchCapacitaciones();
    fetchEmpleos();
    fetchEventos();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar con el componente NavbarLogo */}
      <header>
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de la Unidad de Seguimiento al Egresado y Graduado"
          socialLinks={socialLinks}
          buttons={buttons}
          showLoginButton={true}
        />
      </header>
      <main className="bg-gray-100">
        {/* Convenios */}
        <section className="py-8 mx-auto px-4 sm:px-6 lg:px-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
            Convenios
          </h1>
          <Convenios />
        </section>
        {/* Sección de Eventos */}
        <Section id="eventos" title="Próximos Eventos" icon={Calendar}>
          {loading && <div>Cargando eventos...</div>}
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
        <Separador />
        {/* Sección de Capacitaciones */}
        <Section id="capacitaciones" title="Capacitaciones" icon={BookOpen}>
          {loading && <div>Cargando capacitaciones...</div>}
          {error && <div>{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(capacitaciones) && capacitaciones.map((capacitacion) => (
            <Card 
              key={capacitacion.id} // Asegúrate de que `id` es el identificador único
              title={capacitacion.nombre}
              description={capacitacion.descripcion}
              link="Alumni/Capacitaciones" // Cambia esto si necesitas una ruta específica
            />
          ))}
          </div>
        </Section>
        <Separador />
        {/* Sección de Oportunidades de Empleo */}
        <Section id="empleos" title="Oportunidades de Empleo" icon={Briefcase}>
          {loading && <div>Cargando oportunidades de empleo...</div>}
          {error && <div>{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(empleos) && empleos.map((empleo) => (
              <Card 
                key={empleo.id}
                title={empleo.nombre}
                description={empleo.descripcion}
                link="Alumni/Bolsa-Laboral"
              />
            ))}
          </div>
        </Section>
        <Separador />
        {/* Formatos académicos */}
        <section>
          <div className="container mx-auto px-4 flex flex-col items-center">
            {/* Primera parte: Título */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-gray-800">Recursos Académicos</h2>
            </div>
            {/* Segunda parte: Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
              {recursos.map((recurso) => {
                const Icon = recurso.icon;
                return (
                  <div key={recurso.id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-between transition-transform hover:scale-105">
                    <div className="text-center">
                      <Icon className="w-16 h-16 text-blue-600 mb-6" />
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{recurso.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
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

export default SEgresado;
