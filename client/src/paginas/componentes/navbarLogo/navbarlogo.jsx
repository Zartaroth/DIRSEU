import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';
import Logo2 from '../../images/UAC.png';
import { Menu, X } from 'lucide-react';

const NavbarLogo = ({
  backgroundImage,
  backgroundVideo,
  overlayOpacity = 0.5,
  title,
  subtitle,
  socialLinks,
  buttons,
  showLoginButton = true, // Agregamos una nueva propiedad con valor predeterminado true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Video or Image */}
      {backgroundVideo ? (
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 w-full py-2 px-3 flex justify-between items-center z-50 transition-colors duration-300 ${
            isScrolled ? 'bg-blue-600 text-white' : 'bg-transparent text-white'
          }`}
        >
          {/* Logo */}
          <img src={Logo2} alt="Logo" className="h-12 flex-grow-0" />

          {/* Menu hamburguesa para móviles */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Botones de navegación (oculto en móvil) */}
          <div className="hidden md:flex space-x-4 justify-center w-full">
            {buttons.map((button, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className="border-l border-white h-6 self-center mx-2"></div>
                )}
                <label
                  onClick={() => navigate(button.href)}
                  className="relative cursor-pointer group"
                >
                  {button.label}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 ease-in-out group-hover:w-full ${
                      isScrolled ? 'bg-white' : 'bg-white'
                    }`}
                  ></span>
                </label>
              </React.Fragment>
            ))}
          </div>

          {/* Redes Sociales y Login (oculto en móvil) */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:${social.hoverColor}`}
              >
                {social.icon}
              </a>
            ))}
            {showLoginButton && (
              <button
                className={`px-4 py-2 rounded transition duration-300 ${
                  isScrolled ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                } hover:bg-white hover:text-blue-600`}
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* Menú desplegable para móviles */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-blue-600 text-white p-4 space-y-4 z-50">
            {buttons.map((button, index) => (
              <label
                key={index}
                onClick={() => {
                  navigate(button.href);
                  setIsMenuOpen(false); // Cerrar el menú al hacer clic
                }}
                className="block cursor-pointer"
              >
                {button.label}
              </label>
            ))}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${social.hoverColor}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <button
              className="w-full px-4 py-2 mt-4 rounded bg-white text-blue-600 hover:bg-gray-200"
              onClick={() => {
                navigate('/login');
                setIsMenuOpen(false);
              }}
            >
              Login
            </button>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 pt-20">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </main>
      </div>
    </div>
  );
};

export default NavbarLogo;
