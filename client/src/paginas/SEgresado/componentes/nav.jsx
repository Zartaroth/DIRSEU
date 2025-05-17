import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo2 from '../../images/UAC.png';
import { Stack, Avatar, Typography } from '@mui/material';  // Importa los componentes de MUI
import OptionsMenu from '../../Home/components/OptionsMenu';
import { useAuth } from '../../../context/AuthProvider';  // Asegúrate de que este hook esté bien configurado

function stringToColor(string) {
    let hash = 0;
    // Calcula un valor hash basado en el string
    for (let i = 0; i < string.length; i++) {
        // Suma los códigos ASCII de los caracteres y aplica desplazamiento a la izquierda y resta
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convierte el hash en un color hexadecimal
    const color = `#${((hash & 0x00ffffff) | 0x1000000).toString(16).slice(1)}`;
    return color;
}

function stringAvatar(name) {
    const initials = name.match(/\b\w/g).slice(0, 2).join("");
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: initials,
    };
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getUser } = useAuth(); 

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white shadow-md">
            <div className="flex items-center space-x-2">
                <img src={Logo2} alt="Logo UAC" className="h-10" />
            </div>
            <div className="hidden md:flex space-x-8 font-bold text-[#1a3e72]">
                <Link to="/Alumni/Inicio" className="hover:underline">INICIO</Link>
                <Link to="/Alumni/presentacion" className="hover:underline">PRESENTACION +</Link>
                <Link to="/Alumni/Actualizacion_datos" className="hover:underline">ACTUALIZACION DE DATOS +</Link>
                <Link to="/Alumni/Bolsa-Laboral" className="hover:underline">BOLSA LABORAL +</Link>
                <Link to="/Alumni/procedimietos" className="hover:underline">RECURSOS +</Link>
                <Link to="/Alumni/convenios" className="hover:underline">CONVENIOS +</Link>
                <Link to="/Alumni/Capacitaciones" className="hover:underline">EDUCACION CONTINUA +</Link>
                <Link to="/Alumni/encuestas" className="hover:underline">ENCUESTAS +</Link>
            </div>

            {/* Nueva sección para el Avatar y nombre del usuario */}
            <div className="hidden md:flex items-center space-x-3"> 
                <Stack
                    direction="row"
                    sx={{
                        p: 1,  
                        gap: 1,
                        alignItems: 'center',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Avatar
                        sizes="small"
                        alt={`${getUser()?.firstName} ${getUser()?.lastName}`}
                        sx={{
                            width: 20,
                            height: 20,
                            mr: 1,
                        }}
                        {...stringAvatar(`${getUser()?.firstName} ${getUser()?.lastName}`)}
                    />
                    <Typography component="p" variant="subtitle2" sx={{ ml: 1 }}>
                        {getUser()?.firstName || ""}
                    </Typography>
                    <OptionsMenu />
                </Stack>
            </div>

            {/* Botón de menú móvil */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-6 w-6 text-[#1a3e72]" /> : <Menu className="h-6 w-6 text-[#1a3e72]" />}
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-md p-4">
                    <ul className="space-y-4 font-bold text-[#1a3e72]">
                        <li><Link to="/Alumni" className="hover:underline">INICIO</Link></li>
                        <li><Link to="/Alumni/presentacion" className="hover:underline">PRESENTACION +</Link></li>
                        <li><Link to="/Alumni/Actualizacion_datos" className="hover:underline">ACTUALIZACION DE DATOS +</Link></li>
                        <li><Link to="/Alumni/Bolsa-Laboral" className="hover:underline">BOLSA LABORAL +</Link></li>
                        <li><Link to="/Alumni/procedimietos" className="hover:underline">RECURSOS +</Link></li>
                        <li><Link to="/Alumni/convenios" className="hover:underline">CONVENIOS +</Link></li>
                        <li><Link to="/Alumni/Capacitaciones" className="hover:underline">EDUCACION CONTINUA +</Link></li>
                        <li><Link to="/Alumni/encuestas" className="hover:underline">ENCUESTAS +</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
