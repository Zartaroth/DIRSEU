import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Menu, X, ArrowUp, Mail, MapPin, Calendar } from 'lucide-react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../componentes/nav';
import Organigrama from '../componentes/organigrama';
import axios from 'axios';
import { obtenerEventoCodigoCoordinador } from '../../../api/eventos';

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

const CardComponent = () => (
    <div className="flex flex-col items-center bg-white text-gray-800">
        <div className="max-w-4xl text-center py-12 px-6">
            <h1 className="text-4xl font-light text-blue-800">Alumni UAC</h1>
            <p className="text-lg mt-4 text-gray-600">
                Bienvenido al espacio dedicado a la comunidad de graduados y egresados de la Universidad Andina del Cusco.
                Revisa todos los beneficios y oportunidades que tenemos para continuar con tu desarrollo
                personal y profesional.
            </p>
        </div>
        <div className="w-full bg-blue-900 py-8 px-6 text-white text-lg">
            <div className="max-w-4xl mx-auto">
                <p className="font-semibold">Horario de atención:</p>
                <p className="ml-4">8:00 am a 1:00 pm | 2:00 pm a 4:00 pm</p>
            </div>
        </div>
    </div>
);

const InicioAlumni = () => {
    const [eventos, setEventos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
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
        fetchEventos();
    }, []);

    const image2 = "https://assets.entrepreneur.com/content/3x2/2000/20191031073847-shutterstock-56437339.jpeg";

    return (
        <div className="min-h-screen">
            <Navbar />
            <header className="mt-20">
                <div
                    className="relative bg-cover bg-center h-72"
                    style={{ backgroundImage: `url(${image2})` }}
                >
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-md"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                        <h1 className="text-5xl font-bold">ALUMNI</h1>
                    </div>
                </div>
            </header>
            <main className="py-0">
                <CardComponent />
                <Organigrama />
                {/* Sección de Eventos */}
                <Section id="eventos" title="Próximos Eventos" icon={Calendar}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.isArray(eventos) && 
                            eventos.map((evento) => (
                                <Card
                                  key={evento.id}
                                  title={evento.nombre}
                                  description={evento.descripcion}
                                  image={`${import.meta.env.VITE_API_URL}${evento.imagen}`}
                                  showLink={false}
                                />
                            ))
                        }
                    </div>
                </Section>
            </main>
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
            <footer className="bg-blue-900 text-white py-4">
                <div className="mx-auto text-center py-6">
                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="flex items-center bg-blue-800 p-4 rounded-lg shadow-lg w-full md:w-auto">
                            <MapPin className="mr-2" />
                            <p>Dirección: Larapa, Cusco</p>
                        </div>
                        <div className="flex items-center bg-blue-800 p-4 rounded-lg shadow-lg w-full md:w-auto">
                            <Phone className="mr-2" />
                            <p>60 5000-Anexo 1114</p>
                        </div>
                        <div className="flex items-center bg-blue-800 p-4 rounded-lg shadow-lg w-full md:w-auto">
                            <Mail className="mr-2" />
                            <p>ovillena@uandina.edu.pe</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default InicioAlumni;
