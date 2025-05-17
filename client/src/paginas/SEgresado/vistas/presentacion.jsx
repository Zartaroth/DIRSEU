import { useState } from 'react';
import { Menu, X, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo2 from '../../images/UAC.png';
import Navbar from '../componentes/nav';

export default function Presentation({ 
  purpose = "Programar, organizar, coordinar y controlar la implementación del Programa de Seguimiento del Graduado en las Escuelas Profesionales de la Sede Central y Filial y posibilitar la retroalimentación de las nuevas exigencias y cambios del contexto socio laboral y cultural de nuestra región, del país y del ámbito internacional; con el fin de efectuar ajustes a estructuras curriculares de las Escuelas Profesionales correspondientes cuando se requieran.",
  functions = [
    'Proponer y ejecutar las políticas, normas y procedimientos en el ámbito de su competencia.',
    'Elaborar y proponer el Plan y Presupuesto Operativo de la Coordinación.',
    'Asesorar y apoyar a las Escuelas Profesionales y las Facultades de la Universidad en la elaboración de su directorio de graduados, así como en la conformación de sus respectivas Asociaciones de Graduados.',
    'Desarrollar el Sistema Integral de Información del programa de Seguimiento del Graduado.',
    'Coordinar con la Dirección Tecnologías de Información para el desarrollo del soporte estadístico y gráfico del programa de Seguimiento del Graduado, a fin de brindar información actualizada.',
    'Recoger la información de parte de los graduados para evaluar la pertinencia de los planes de estudio y de los perfiles de egresados de las escuelas profesionales de la Universidad; identificar las necesidades de formación y capacitación y desempeño laboral de los graduados.',
    'Contar con la información confiable y oportuna de la oferta laboral a nivel local, regional, nacional e internacional, para los graduados de la Universidad y facilitar su inserción laboral.',
    'Informar los resultados de los estudios de seguimiento de graduados realizados, para la mejora de sus procesos sustantivos del proceso enseñanza-aprendizaje, investigación.',
    'Recomendar la actualización de los planes de estudio de las escuelas profesionales de la Universidad y coadyuvar a la mejora continua en el proceso formativo del estudiante de la Universidad Andina.',
    'Planificar y organizar eventos académicos, actividades socioculturales y deportivas, para fomentar la vinculación y fidelización de los graduados con la Universidad.',
    'Coordinar y promover actividades académicas de formación continua para los egresados y graduados en coordinación con la Dirección de Desarrollo Académico y la Escuela de Posgrado de la Universidad.',
    'Elaborar informes estadísticos anuales como mecanismo de rendición de cuentas a la sociedad y para elaborar planes de mejora.',
  ],
  coordinator = {
    name: "Ing. Olmer Claudio Villena Leon",
    position: "Coordinador del Sistema de Seguimiento al Egresado",
    image: "https://media.licdn.com/dms/image/C5103AQHFyRiJDqBiMg/profile-displayphoto-shrink_800_800/0/1516901955162?e=2147483647&v=beta&t=1hv6faRQLbfYqkVXwCr-0gwiPtLvsBJbZ6xyteORb0U",
    skills: ["Liderazgo", "Comunicación", "Gestión de proyectos", "Resolución de problemas"]
  },
  purposeImage = "https://www.iestpsausa.edu.pe/wp-content/uploads/2021/08/egresados.png" 
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Función para desplazar hacia arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const location = useLocation();
  
  // Divide la ruta actual en partes
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  // Crea un arreglo de enlaces
  const links = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return (
      <Link key={segment} to={path} className="text-white hover:underline">
        {segment.charAt(0).toUpperCase() + segment.slice(1)}
      </Link>
    );
  });
  const image2 = "https://assets.entrepreneur.com/content/3x2/2000/20191031073847-shutterstock-56437339.jpeg"

  return (
    <>
        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <header className="mt-16">
            <div
                className="relative bg-cover bg-center h-72"
                style={{ backgroundImage: `url(${image2})` }}
            >
                <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-md"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                    <h1 className="text-5xl font-bold">Presentación</h1>
                    <p className="mt-2 text-lg">
                        <Link to="/Alumni/Inicio" className="hover:underline">Alumni</Link> / {links.reduce((prev, curr) => [curr])}
                    </p>
                </div>
            </div>
        </header>
      
        {/* Main Content */}
        <main className="p-4">
            <div className="max-w-4xl mx-auto mt-4">
                <h1 className="text-3xl font-bold text-center mb-8">Presentación del Coordinador</h1>
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 transition-transform duration-300 transform hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
                            <img src={coordinator.image} alt={coordinator.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{coordinator.name}</h3>
                            <p className="text-gray-500">{coordinator.position}</p>
                        </div>
                    </div>
                    <h4 className="font-semibold mb-2">Habilidades:</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {coordinator.skills.map((skill, index) => (
                            <div key={index} className="bg-gray-100 p-2 rounded-md text-center">{skill}</div>
                        ))}
                    </div>
                </div>
                
                {/* Propósito con imagen al lado */}
                <div className="bg-white shadow-lg rounded-lg mb-8 p-6 transition-transform duration-300 transform hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-4">Propósito</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col justify-center">
                            <p>{purpose}</p>
                        </div>
                        <img src={purposeImage} alt="Propósito" className="rounded-lg" />
                    </div>
                </div>

                {/* Funciones específicas */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 transition-transform duration-300 transform hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-4">Funciones específicas</h2>
                    <ul className="list-disc list-inside">
                        {functions.map((func, index) => (
                            <li key={index} className="mb-2">{func}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>

        {/* Back to top button */}
        <button 
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
            <ArrowUp className="h-5 w-5" />
        </button>

        {/* Footer */}
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
    </>
  );
}
