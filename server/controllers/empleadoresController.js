import Empleador from '../models/Empleador.js';

export async function crearEmpleador(req, res) {
  try {
    const { nombre_empresa, area_negocio, direccion, telefono, email } = req.body;

    // Verificar si los campos obligatorios están presentes
    if (!nombre_empresa || !email) {
      return res.status(400).json({ error: 'Los campos nombre de empresa y email son obligatorios.' });
    }

    // Crear el empleador
    await Empleador.crear({ nombre_empresa, area_negocio, direccion, telefono, email });
    res.status(201).json({ mensaje: 'Empleador creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el empleador.' });
  }
}

export async function obtenerEmpleadores(req, res) {
  try {
    const [empleadores] = await Empleador.obtenerTodos();
    res.json(empleadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los empleadores.' });
  }
}

export async function obtenerEmpleador(req, res) {
  try {
    const { id } = req.params;
    const [empleador] = await Empleador.obtenerPorId(id);

    if (empleador.length === 0) {
      return res.status(404).json({ error: 'Empleador no encontrado.' });
    }

    res.json(empleador[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el empleador.' });
  }
}

export async function eliminarEmpleador(req, res) {
  try {
    const { id } = req.params;

    // Verificar si el empleador existe
    const [empleador] = await Empleador.obtenerPorId(id);
    if (empleador.length === 0) {
      return res.status(404).json({ error: 'Empleador no encontrado.' });
    }

    // Eliminar el empleador
    await Empleador.eliminar(id);
    res.json({ mensaje: 'Empleador eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleador.' });
  }
};

// Obtener estadísticas del empleador
export const obtenerEstadisticasEmpleador = async (req, res) => {
  try {
    const empleadorId = req.params.id;

    // Lógica para calcular estadísticas (ejemplo básico)
    const totalOfertas = await Empleador.countOfertas(empleadorId);
    const totalPostulaciones = await Empleador.countPostulaciones(empleadorId);
    const totalContratados = await Empleador.countContratados(empleadorId);

    res.status(200).json({
      totalOfertas,
      totalPostulaciones,
      totalContratados,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas del empleador', error });
  }
};
