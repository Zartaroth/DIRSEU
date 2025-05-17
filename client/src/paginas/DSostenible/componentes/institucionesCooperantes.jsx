import React from 'react';
import Logo1 from '../../images/cuscorecicla.jpg';
import Logo2 from '../../images/UAC.png';

const cooperatingInstitutions = [
  { name: 'Cusco Recicla', logo: Logo1 },
  { name: 'Universidad Andina del Cusco', logo: Logo2 },
  { name: 'Institution 3', logo: Logo1 },
  { name: 'Institution 4', logo: Logo1 },
];

const InstitucionesCooperantes = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Instituciones Cooperantes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cooperatingInstitutions.map((institution, index) => (
            <figure
              key={index}
              className="flex flex-col items-center justify-center"
            >
              {institution.logo ? (
                <img
                  src={institution.logo}
                  alt={`Logo de ${institution.name}`}
                  className="max-w-full h-32 object-contain transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Sin logo</span>
                </div>
              )}
              
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitucionesCooperantes;
