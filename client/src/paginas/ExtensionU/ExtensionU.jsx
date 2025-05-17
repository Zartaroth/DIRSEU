import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Globe, ChevronDown, ArrowUp, Calendar } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Footer from '../componentes/footer/footer';
import Mof from '../componentes/mof/mof';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';
import axios from 'axios';
import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';

const Program = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-green-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
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

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };
  
  return (
    <div className="border-b border-gray-100">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-semibold">{title}</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

const ExtensionU = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [eventos, setEventos] = useState([]);

  const purpose = 'Programar, organizar y controlar el desarrollo de programas de extensión universitaria y de proyección social en beneficio de la población menos favorecida de la región, con la participación y apoyo técnico de las facultades.';
  const functions = [
    'Ejecutar las políticas y normas establecidas en el ámbito de su competencia funcional.',
    'Coordinar con las Comisiones de Responsabilidad Social y Extensión Universitaria de las facultades, en la formulación de los programas de extensión universitaria y de proyección social.',
    'Coordinar, elaborar y proponer el Reglamento de Funcionamiento de las actividades de extensión universitaria y proyección social de la Universidad, dentro del marco de política institucional de la universidad y los lineamientos de acreditación.',
    'Desarrollar programas de extensión universitaria en lo académico, cultural y artístico en favor de la comunidad local y regional.',
    'Difundir los trabajos de investigación y programas de acción social desarrollados por la universidad en favor de la comunidad local y regional menos favorecida.',
    'Vincular a las facultades y escuelas profesionales con las comunidades y la población menos favorecida de la región, para dar solución a sus problemas en lo que corresponde a su responsabilidad.',
    'Organizar eventos sobre responsabilidad social para docentes y estudiantes de las facultades, a fin de dar a conocer los impactos que tiene la Universidad en su quehacer universitario ante la comunidad local y regional.',
    'Coordinar y proponer en base al análisis de la problemática social de las comunidades locales y regionales del Cusco, programas y proyectos de proyección social multidisciplinaria a desarrollar por la Dirección, con la participación de las facultades.',
  ];

  const handleScroll = () => {
    setShowScrollButton(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/eventos/coordinador/C002`);
        
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
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de la Unidad de Extensión Universitaria"
          subtitle=""
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>

      <main className="bg-gray-100">
        {/* Programas */}
        <section id="programas" className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestros Programas de Extensión</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Program 
                icon={Users} 
                title="Voluntariado Comunitario" 
                description="Participa en proyectos que impactan directamente en las comunidades locales."
              />
              <Program 
                icon={BookOpen} 
                title="Educación Continua" 
                description="Cursos abiertos a la comunidad para el aprendizaje a lo largo de la vida."
              />
              <Program 
                icon={Globe} 
                title="Proyectos de Desarrollo Sostenible" 
                description="Iniciativas que promueven el desarrollo en la región."
              />
            </div>
          </div>
        </section>

        {/* Impacto */}
        <section id="impacto" className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestro Impacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-green-500 mb-2">5,000+</h3>
                <p className="text-xl text-gray-500">Beneficiarios Directos</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-green-500 mb-2">50+</h3>
                <p className="text-xl text-gray-500">Proyectos Comunitarios</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-green-500 mb-2">100+</h3>
                <p className="text-xl text-gray-500">Alianzas Estratégicas</p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-auto">
          <Mof 
            purpose={purpose} 
            functions={functions} 
            backgroundImage="https://imgix-prod.sgs.com/-/media/sgscorp/images/temporary/tree-held-by-hands-1600px.cdn.en-PH.1.png?fit=crop&crop=edges&auto=format&w=1200&h=630"
          />
        </div>

        {/* Preguntas Frecuentes */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
            <div className="max-w-2xl mx-auto">
              <Accordion title="¿Cómo puedo participar en los programas de extensión?">
                <p className="text-gray-600">
                  Puedes participar inscribiéndote en los programas de tu interés a través de nuestra plataforma en línea o visitando la oficina de Extensión Universitaria en el campus.
                </p>
              </Accordion>
              <Accordion title="¿Los programas tienen algún costo?">
                <p className="text-gray-600">
                  La mayoría de nuestros programas son gratuitos para estudiantes y miembros de la comunidad. Algunos cursos especializados pueden tener un costo nominal.
                </p>
              </Accordion>
              <Accordion title="¿Puedo proponer un nuevo proyecto de extensión?">
                <p className="text-gray-600">
                  ¡Absolutamente! Valoramos las iniciativas de nuestros estudiantes y miembros de la comunidad. Puedes presentar tu propuesta en la oficina de Extensión Universitaria.
                </p>
              </Accordion>
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
                  image={`${import.meta.env.VITE_API_URL}${evento.imagen}`} // Concatenamos la URL base con la ruta de la imagen
                  showLink={false}
                />
              ))
            }
          </div>
        </Section>
      </main>

      {/* Footer */}
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

export default ExtensionU;
