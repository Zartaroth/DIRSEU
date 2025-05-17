import Calendario from "../models/calendario.js";

export async function crearCalendario(req, res) {
    try {
        const { titulo, descripcion, fecha, enlace } = req.body;

        if (!titulo || !fecha) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios. '});
        }
        const nuevoCalendarioData = {
            titulo,
            descripcion,
            fecha,
            enlace
        };

        const nuevoCalendario = await Calendario.crear(nuevoCalendarioData);

        res.status(201).json(nuevoCalendario);
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la capacitacion' });
    }
}

export async function obtenerEventosCalendario(req, res) {
    try {
        const calendario = await Calendario.obtenerTodos(req.params.id);
        res.json(calendario);
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener eventos del Calendario' });
    }
}

export async function actualizarCalendario(req, res) {
    try {
        const { id } = req.params;
        const { titulo, descripcion, fecha, enlace } = req.body;

        let calendario = await Calendario.obtenerPorId(id);
        if (!calendario) {
            return res.status(404).json({ error: 'Evento de calendario no encontrado' });
        }

        calendario.titulo = titulo || calendario.titulo;
        calendario.descripcion = descripcion || calendario.descripcion;
        calendario.fecha = fecha || calendario.fecha;
        calendario.enlace = enlace || calendario.enlace;

        await calendario.actualizar();

        res.json(calendario);
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar evento del calendario'});
    }
}

export async function eliminarCalendario(req, res) {
    try {
        const { id } = req.params;
        const calendario = await Calendario.obtenerPorId(id);
        if (!calendario) {
            return res.status(404).json({ error: 'Evento de calendario no encontrada' });
        }

        await calendario.eliminar();

        res.json({ mensaje: 'Evento de calendario eliminada con exito' });
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar evento de calendario' });
    }
}