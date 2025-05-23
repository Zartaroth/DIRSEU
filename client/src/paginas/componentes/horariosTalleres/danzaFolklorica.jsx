import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function DanzaFolklorica() {
  const navigate = useNavigate();

  const handleNavigateToInscription = () => {
    navigate('/Home/modules/list/talleres'); // Cambia esto a la ruta correspondiente en tu app
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://chat.whatsapp.com/JKyZuJT14vfCD4UdpFtlXM', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">DANZA FOLKLÓRICA</h1>
      
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-t-lg shadow-md">
        <h2 className="text-xl font-semibold text-center">HORARIOS</h2>
        <h3 className="text-lg font-medium text-center">TALLER DE DANZA FOLKLÓRICA</h3>
      </div>
      
      <div className="bg-white p-6 border border-gray-200 rounded-b-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between mb-6 text-gray-700">
          <p className="font-semibold">INSTRUCTOR: Alex Cusi Rojas</p>
          <p className="font-semibold">Celular: 984 794 625</p>
        </div>
        
        <h4 className="text-lg font-semibold mb-4 bg-yellow-100 p-3 rounded-lg text-center">HORARIOS</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">DÍAS</th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">HORAS</th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">MODALIDAD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 transition duration-200">
                <td className="border px-6 py-3">MARTES, JUEVES Y SÁBADO</td>
                <td className="border px-6 py-3">De 16:00 a 20:00 h.</td>
                <td className="border px-6 py-3">PRESENCIAL</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-around gap-4">
          <Button
            variant="contained"
            color="success"
            className="w-full sm:w-auto text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-green-600"
            onClick={handleNavigateToInscription}
          >
            Ir a INSCRIPCIÓN DANZA FOLKLÓRICA
          </Button>
          <Button
            variant="contained"
            color="success"
            className="w-full sm:w-auto text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-green-600"
            onClick={handleWhatsAppRedirect}
          >
            Unirse a GRUPO DE WHATSAPP
          </Button>
        </div>
      </div>
    </div>
  );
}
