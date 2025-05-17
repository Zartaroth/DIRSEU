import { execute, query } from "../utils/db.js";

class Calendario {
    constructor(calendario) {
        this.id = calendario.id;
        this.titulo = calendario.titulo;
        this.descripcion =calendario.descripcion;
        this.fecha = calendario.fecha;
        this.enlace = calendario.enlace;
    }

    static async crear(nuevoCalendario) {
        try {
            const [result] = await execute(
                'INSERT INTO calendario (titulo, descripcion, fecha, enlace) VALUES (?, ?, ?, ?)',
                [
                    nuevoCalendario.titulo,
                    nuevoCalendario.descripcion || null,
                    nuevoCalendario.fecha,
                    nuevoCalendario.enlace || null
                ]
            );

            const [calendarioRows] = await execute('SELECT * FROM calendario WHERE id = ?', [result.insertId]);
            if (calendarioRows.length === 0) {
                throw new Error('Calendario no encontrado despues de la insercion.');
            }

            return new Calendario(calendarioRows[0]);
        }   catch (error) {
            console.error('Error en Calendario.crear', error);
            throw error;
        }
    }

    static async obtenerTodos() {
        try {
            const calendario = await query('SELECT * FROM calendario');
            return calendario.map(calendario => new Calendario(calendario));
        }   catch (error) {
            console.error('Error en obtener todos los eventos del calendario: ', error);
            throw error;
        }
    }

    static async obtenerPorId(id) {
        const [calendario] = await execute('SELECT * FROM calendario WHERE id = ?', [id]);
        if (calendario.length === 0) return null;
        return new Calendario(calendario[0]);
    }

    async actualizar() {
        await execute(
            'UPDATE calendario SET titulo = ?, descripcion = ?, fecha = ?, enlace = ? WHERE id = ?',
            [this.titulo, this.descripcion, this.fecha, this.enlace, this.id]
        );
    }

    async eliminar() {
        await execute('DELETE FROM calendario WHERE id = ?', [this.id]);
    }
}

export default Calendario;