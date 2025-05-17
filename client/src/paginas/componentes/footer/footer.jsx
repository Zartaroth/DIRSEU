import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const TeamMemberCard = ({ name, title, email }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
    <h4 className="text-lg font-semibold text-white mb-2">{name}</h4>
    <p className="text-sm text-gray-300 mb-2">{title}</p>
    <a href={`mailto:${email}`} className="text-blue-300 hover:underline text-sm flex items-center">
      <Mail className="mr-2" /> {/* Ícono de correo */}
      {email}
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="w-4/5 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Contáctanos</h3>
            <form className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-2 text-gray-400" />
                <p className="text-gray-400">Cusco, Perú</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-gray-400" />
                <p className="text-gray-400">605000-ANEXO 1114</p>
              </div>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Mensaje"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Equipo de Trabajo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TeamMemberCard
                name="Mg. Jannette Delgado Obando"
                title="Directora DIRSEU"
                email="jdelgadoo@uandina.edu.pe"
              />
              <TeamMemberCard
                name="Mg. Susana Molleapaza Ugarte"
                title="Coordinadora de la Unidad de Cooperación para el Desarrollo Sostenible"
                email="smolleapaza@uandina.edu.pe"
              />
              <TeamMemberCard
                name="Mg. Erick Mijail Martínez Rojas"
                title="Coordinador de la Unidad de Extensión Universitaria"
                email="emartinez@uandina.edu.pe"
              />
              <TeamMemberCard
                name="Ing. Olmer Villena León"
                title="Coordinador de la Unidad de Seguimiento al Egresado y Graduado"
                email="ovillena@uandina.edu.pe"
              />
              <TeamMemberCard
                name="Ing. Velia Ardiles Romero"
                title="Coordinadora de la Unidad de Atención al Desarrollo Formativo"
                email="vardiles@uandina.edu.pe"
              />
              <TeamMemberCard
                name="DIRSEU"
                title="Dirección de Responsabilidad Social y Extensión Universitaria"
                email="dirseu@uandina.edu.pe"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Dirección de Responsabilidad Social y Extensión Universitaria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;