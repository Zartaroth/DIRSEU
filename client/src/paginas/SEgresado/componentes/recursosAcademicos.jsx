import React from 'react';
import { FileText, Book, Scale, Microscope, Search, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'formatos',
    title: 'Formatos',
    icon: <FileText className="w-8 h-8" />,
    url: '#formatos',
  },
  {
    id: 'resoluciones',
    title: 'Resoluciones',
    icon: <Book className="w-8 h-8" />,
    url: '#resoluciones',
  },
  {
    id: 'reglamentos',
    title: 'Reglamentos',
    icon: <Scale className="w-8 h-8" />,
    url: '#reglamentos',
  },
  {
    id: 'investigacion',
    title: 'Investigación',
    icon: <Microscope className="w-8 h-8" />,
    url: '#investigacion',
  },
  {
    id: 'turnitin',
    title: 'Turnitin',
    icon: <Search className="w-8 h-8" />,
    url: '#turnitin',
  },
];

export default function RecursosAcademicos() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Recursos Académicos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-between h-full">
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 text-blue-600">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
            </div>
            <a
              href={category.url}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ver más
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
