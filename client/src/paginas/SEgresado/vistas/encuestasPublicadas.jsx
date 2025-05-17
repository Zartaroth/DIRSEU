import { useState } from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../componentes/nav';
import EncuestasList from '../../../coordinadores/encuestas/visualizacion/encuestasDisponibles';

export default function EncuestasPublicadas() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Función para desplazar hacia arriba
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const image2 = "https://assets.entrepreneur.com/content/3x2/2000/20191031073847-shutterstock-56437339.jpeg";

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />
            {/* Contenido principal */}
            <header className="mt-16">
                <div
                    className="relative bg-cover bg-center h-72"
                    style={{ backgroundImage: `url(${image2})` }}
                >
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-md"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                        <h1 className="text-5xl font-bold">Encuestas</h1>
                        <p className="mt-2 text-lg">
                            <h4>Alumni / Encuestas</h4>
                        </p>
                    </div>
                </div>
            </header>
            <main className="flex-grow">
                <EncuestasList />
            </main>
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
        </div>
    );
}
