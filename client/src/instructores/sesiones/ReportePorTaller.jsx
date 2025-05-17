import React, { useEffect, useState } from "react";
import { getAsistenciasByTallerId } from "../../api/asistencia";
import { useParams } from "react-router-dom";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import * as XLSX from "xlsx"; // Importamos la librería xlsx

const ReportePorTaller = () => {
  const { tallerId } = useParams();
  const [data, setData] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombreTaller, setNombreTaller] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Mes actual
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos'); // Filtro de asistencias

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAsistenciasByTallerId(tallerId);

        if (response && response.asistencias) {
          const { taller, asistencias } = response.asistencias;
          setNombreTaller(taller);
          setEstudiantes(Object.keys(asistencias));
          setData(asistencias);
        }
      } catch (error) {
        console.error("Error al obtener asistencias:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tallerId) {
      fetchData();
    }
  }, [tallerId]);

  // Generar todas las fechas del mes actual
  const fechasDelMes = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Cambiar el mes actual (paginación)
  const handleMonthChange = (direction) => {
    setCurrentMonth((prevMonth) =>
      direction === "prev" ? subMonths(prevMonth, 1) : addMonths(prevMonth, 1)
    );
  };

  // Filtrar los estudiantes según su estado de asistencia
  const filteredEstudiantes = estudiantes.filter((estudiante) => {
    if (filter === 'presente') {
      return Object.values(data[estudiante]).includes('Presente');
    }
    if (filter === 'ausente') {
      return Object.values(data[estudiante]).includes('Ausente');
    }
    return true; // Mostrar todos
  });

  // Función para descargar el reporte en Excel
  const descargarExcel = () => {
    const wsData = [
      ["Nombres", ...fechasDelMes.map((fecha) => format(fecha, "dd/MM"))], // Cabecera
      ...filteredEstudiantes.map((estudiante) => [
        estudiante,
        ...fechasDelMes.map((fecha) => {
          return data[estudiante][format(fecha, "yyyy-MM-dd")] || "No registrado"; // Asistencia de cada estudiante
        }),
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Asistencias");

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(wb, `Reporte_Asistencias_${nombreTaller}.xlsx`);
  };

  if (loading) {
    return <p className="text-gray-500">Cargando datos...</p>;
  }

  if (!data || estudiantes.length === 0) {
    return <p className="text-gray-500">No hay datos de asistencias para mostrar.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Reporte de Asistencias</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-6">{nombreTaller}</h2>

      {/* Controles de paginación */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleMonthChange("prev")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mes anterior
        </button>
        <p className="text-gray-700 font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </p>
        <button
          onClick={() => handleMonthChange("next")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mes siguiente
        </button>
      </div>

      {/* Filtros de asistencia */}
      <div className="mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded"
        >
          <option value="todos">Todos</option>
          <option value="presente">Presentes</option>
          <option value="ausente">Ausentes</option>
        </select>
      </div>

      {/* Botón para descargar Excel */}
      <div className="mb-4">
        <button
          onClick={descargarExcel}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Descargar en Excel
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Nombres</th>
              {fechasDelMes.map((fecha, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {format(fecha, "dd/MM")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEstudiantes.map((estudiante, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="border border-gray-300 px-4 py-2">{estudiante}</td>
                {fechasDelMes.map((fecha, idx) => (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        disabled
                        checked={data[estudiante][format(fecha, "yyyy-MM-dd")] === "Presente"}
                      />
                      <div
                        className={`w-11 h-6 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-4 transition-all ${
                          data[estudiante][format(fecha, "yyyy-MM-dd")] === "Ausente"
                            ? "bg-red-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition-all"></div>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportePorTaller;
