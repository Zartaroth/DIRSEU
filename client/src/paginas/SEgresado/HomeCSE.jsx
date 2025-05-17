import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Menu, X, ArrowUp, Mail, MapPin } from 'lucide-react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Navbar from './componentes/nav';
import Organigrama from './componentes/organigrama';

const comunicados = [
    {
        image: "https://z-p3-scontent.flim4-3.fna.fbcdn.net/v/t39.30808-6/462779840_122170978466156263_9139584553876081795_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEzW4HQcXG3RIWFDkillWuODsjiuVlHiGsOyOK5WUeIa0QS9xbhNi7nDApUaEkXa8iRMnNrwdVrroyEiPpidhKu&_nc_ohc=KDUyb6E5x2oQ7kNvgFlGPEB&_nc_zt=23&_nc_ht=z-p3-scontent.flim4-3.fna&_nc_gid=A_zhSmspqq5OH1ga4A162ns&oh=00_AYCQkb8RaNhzRg_pip95p2bnvwvUkOYhDr4ubo_vsFrezg&oe=6732C79C",
    },
    {
        image: "https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/266578991_4909484112445675_1962966390412107378_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFV6UL1SpCckGMDhUM_9t9Y0T4p5kuGs_7RPinmS4az_jlwW_O1nrfIxzPl2ge-umSaIAnA0frSPzZ9oeITO-YB&_nc_ohc=rXm4bKrvBZkQ7kNvgG9UAIs&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=Ar8WbQ41TSnec_tAiSIO5EG&oh=00_AYCZ6Iwjx7unySMg9vHujanDpa4oYLrVU2HX1N0Fj1nYpw&oe=672FE45F", // Otra imagen
    },
    {
        image: "",
    },
    {
        image: "",
    },
    
];

const CardComponent = () => {
    return (
      <div className="flex flex-col items-center bg-white text-gray-800">
        {/* Encabezado y mensaje de bienvenida */}
        <div className="max-w-4xl text-center py-12 px-6">
          <h1 className="text-4xl font-light text-blue-800">Alumni UAC</h1>
          <p className="text-lg mt-4 text-gray-600">
            Bienvenido al espacio dedicado a la comunidad de graduados y egresados de la Universidad Andina del Cusco.
            Revisa todos los beneficios y oportunidades que tenemos para continuar con tu desarrollo
            personal y profesional.
          </p>
        </div>
  
        {/* Sección de contacto */}
        <div className="w-full bg-blue-900 py-8 px-6 text-white text-lg">
          <div className="max-w-4xl mx-auto">
            <p className="font-semibold">Horario de atención:</p>
            <p className="ml-4">8:00 am a 1:00 pm | 2:00 pm a 4:00 pm</p>
          </div>
        </div>
      </div>
    );
  };

const ComunicadoCarousel = () => (
    <Box
        sx={{
            width: '80%', 
            margin: '0 auto',
            padding: '2rem 0',
            backgroundColor: '#e0f2f1',
            borderRadius: '8px',
            overflow: 'hidden',
        }}
    >
        <Carousel
            navButtonsAlwaysVisible
            autoPlay={false}
            animation="slide"
            indicators={true}
            indicatorContainerProps={{
                style: {
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                },
            }}
            indicatorIconButtonProps={{
                style: { color: '#B0BEC5' }, // Color de indicadores
            }}
            activeIndicatorIconButtonProps={{
                style: { color: '#007BFF' }, // Color indicador activo
            }}
            NextIcon={<ArrowForwardIos sx={{ color: '#616161' }} />}
            PrevIcon={<ArrowBackIos sx={{ color: '#616161' }} />}
        >
            {comunicados.map((comunicado, index) => (
                <Box
                    key={index}
                    component="img"
                    src={comunicado.image}
                    alt={`Comunicado ${index + 1}`}
                    sx={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'contain', 
                        borderRadius: '8px',
                        boxShadow: 3,
                    }}
                />
            ))}
        </Carousel>
    </Box>
);

const HomeCSE = () => {
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
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />
            <main className=''>
                <Outlet />
                {/* <CardComponent />
                <h1 className='text-center py-4'>Comunicados</h1>
                <ComunicadoCarousel />
                <Organigrama /> */}
            </main>
            {/* Back to top button */}
            <button 
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
            
        </div>
    );
};

export default HomeCSE;
