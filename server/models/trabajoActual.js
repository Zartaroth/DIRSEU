import { execute, query } from "../utils/db.js";

class EmpleoActual {
    constructor(empleo) {
        this.id = empleo.id;
        this.id_egresado = empleo.idEgresado;
        this.cargo_laboral = empleo.cargoLaboral;
        this.institucion = empleo.institucion;
        this.area = empleo.area;
        this.grado_universitario = empleo.gradoUniversitario;
        this.fecha_inicio = empleo.fechaInicio;
    }

    // Crear un nuevo empleo actual
    static async crear(nuevoEmpleo) {
        try {
            const [result] = await execute(
                'INSERT INTO empleoActual (idEgresado, cargoLaboral, institucion, area, gradoUniversitario, fecha_inicio) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    nuevoEmpleo.id_egresado,
                    nuevoEmpleo.cargo_laboral,
                    nuevoEmpleo.institucion,
                    nuevoEmpleo.area,
                    nuevoEmpleo.grado_universitario,
                    nuevoEmpleo.fecha_inicio
                ]
            );
            const [empleoRows] = await execute('SELECT * FROM empleoActual WHERE id = ?', [result.insertId]);
            return new EmpleoActual(empleoRows[0]);
        } catch (error) {
            throw error;
        }
    }

    // Obtener todos los empleos actuales
    static async obtenerTodos() {
        try {
            const empleos = await query('SELECT * FROM empleoActual');
            return empleos.map(emp => new EmpleoActual(emp));
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            throw error;
        }
    }

    // Obtener un empleo actual por ID
    static async obtenerPorId(id) {
        const [empleos] = await execute('SELECT * FROM empleoActual WHERE id = ?', [id]);
        if (empleos.length === 0) return null;
        return new EmpleoActual(empleos[0]);
    }

    // Obtener empleos actuales por egresado
    static async obtenerPorEgresado(idEgresado) {
        const [empleos] = await execute('SELECT * FROM empleoActual WHERE idEgresado = ?', [idEgresado]);
        return empleos.map(emp => new EmpleoActual(emp));
    }

    // Actualizar un empleo actual
    async actualizar() {
        try {
            console.log("Datos recibidos para actualizar:", this);

            const [result] = await execute(
                'UPDATE empleoActual SET cargoLaboral = ?, institucion = ?, area = ?, gradoUniversitario = ?, fecha_inicio = ? WHERE id = ?',
                [this.cargo_laboral, this.institucion, this.area, this.grado_universitario, this.fecha_inicio, this.id]
            );

            if (result.affectedRows === 0) {
                throw new Error('No se encontró el empleo actual para actualizar.');
            }

            return this;
        } catch (error) {
            throw new Error(`Error al actualizar empleo actual: ${error.message}`);
        }
    }

    // Eliminar un empleo actual por ID
    static async eliminar(id) {
        try {
            const [result] = await execute('DELETE FROM empleoActual WHERE id = ?', [id]);
            if (result.affectedRows === 0) throw new Error('No se encontró el empleo actual para eliminar.');
            return id;
        } catch (error) {
            throw error;
        }
    }
}

export default EmpleoActual;
