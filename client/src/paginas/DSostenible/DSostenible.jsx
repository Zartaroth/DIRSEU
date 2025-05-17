import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Leaf, Users, BookOpen, Globe, ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Footer from '../componentes/footer/footer';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Mof from '../componentes/mof/mof';
import MissionVisionCards from '../componentes/cardMV/cardMV';
import CalendarioAmbiental from './componentes/CalendarioAmbiental';
import DocumentosInteres from './componentes/DocumentosInteres';
import InstitucionesCooperantes from './componentes/institucionesCooperantes';
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
        className="w-full object-contain mb-4 rounded-t-lg"
      />
    )}
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    {showLink && (
      <a href={link} className="text-blue-600 hover:underline">Más información</a>
    )}
  </motion.div>
);

const DSostenible = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventos/coordinador/C003`);
        
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

  const purpose = 'Programar y desarrollar las actividades inherentes a la cooperación del desarrollo sostenible que permitan integrar y vincular a la universidad, con la sociedad a través de planes, programas y proyectos de carácter sociales o ambientales a favor de la población local, regional y nacional.';
  const functions = [
    'Ejecutar las políticas y normas que correspondan al ámbito funcional de su competencia.',
    'Participar en la formulación y evaluación del Plan Operativo y Presupuesto de la Dirección, de acuerdo a los lineamientos y disposiciones establecidas.',
    'Promover la realización de eventos educativos, foros y actividades académicas en general, relacionadas con el medio ambiente y el desarrollo sostenible.',
    'Promover la participación directa de los estudiantes en materia de promoción y fomento del desarrollo sostenible, protección y conservación del medio ambiente, fortalecimiento de la gestión ambiental satisfactoria, oportuna y resguardo de los derechos ambientales de la región.',
    'Constituir las comisiones ambientales de las diferentes Escuelas Profesionales de la Sede Central y Filial.',
    'Promover el fomento del desarrollo en coordinación con instituciones públicas y privadas de la región.',
    'Difundir, ejecutar, actualizar y defender los objetivos y lineamientos que establece la política ambiental de la universidad.',
    'Coordinar y establecer vínculos de cooperación con investigadores y entidades nacionales e internacionales, que financian o trabajan en proyectos para el desarrollo sostenible de la región.',
    'Proponer nuevos programas de servicio social que puedan incorporarse y ser orientados a la currícula de las escuelas profesionales.',
    'Promover debates sobre desarrollo sostenible y medio ambiente, así como la preservación de la herencia cultural, en el ámbito universitario local.',
    'Convocar y organizar programas de voluntariado con los estudiantes y/o docentes de la Universidad, para atender las necesidades latentes que afectan a la población local y regional menos favorecida del Cusco.',
  ];

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

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        {/* Incorporar NavbarLogo aquí */}
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de cooperación para el desarrollo sostenible"
          subtitle=""
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>
      <main className="bg-gray-100">
        <section id="conocemas" className="w-full md:py-6 lg:py-0">
          <div className="container mx-auto px-1 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 mx-auto">
            Misión y Visión
          </h2>
          <MissionVisionCards
            mission="La Dirección de Responsabilidad Social y Extensión Universitaria de la Universidad Andina del Cusco planifica, organiza y dirige las actividades de responsabilidad social y extensión universitaria, promoviendo y articulando las iniciativas de los estudiantes, docentes, egresados y graduados de la Universidad Andina del Cusco, para contribuir al desarrollo sostenible de la comunidad local, regional y nacional."
            vision="La Dirección de Responsabilidad Social y Extensión Universitaria de la Universidad Andina del Cusco al 2025, será líder en la gestión ética y eficaz del impacto generado por la universidad contribuyendo al desarrollo sostenible de la sociedad, en base al ejercicio de sus funciones sustantivas de formación profesional, de investigación, de servicios de extensión y proyección social."
          />
          </div>
        </section>
        {/* Sección de Mof */}
        <div className="h-auto">
          <Mof purpose={purpose} functions={functions}
          backgroundImage='https://imgix-prod.sgs.com/-/media/sgscorp/images/temporary/tree-held-by-hands-1600px.cdn.en-PH.1.png?fit=crop&crop=edges&auto=format&w=1200&h=630'
          />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-7xl mx-auto px-4"
        >
          <h2 className="py-10 text-3xl font-bold text-center mb-4 text-black">Nuestro Impacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comunidad Impactada</h3>
              <p>Más de 19 000 de estudiantes beneficiadas por nuestros programas</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proyectos Educativos</h3>
              <p>50+ proyectos de educación ambiental implementados</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Globe className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alcance Global</h3>
              <p>Colaboraciones con 20+ organizaciones internacionales</p>
            </motion.div>
          </div>
        </motion.section>
        <section className="py-5">    
          <CalendarioAmbiental />
        </section>
        <section className="py-5">    
          <DocumentosInteres />
        </section>
        <Section id="eventos" title="Próximos Eventos" icon={Calendar}>
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
        <section className="py-5">    
          <InstitucionesCooperantes />
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
            className="fixed bottom-5 right-5 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-blue-700"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DSostenible;
