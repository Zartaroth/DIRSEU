import { pool } from '../utils/db.js';

export const getCategories = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Categorias');

        console.log(result);
        res.json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Productos');

        console.log(result);
        res.json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {

    try {
        const [result] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [req.params.id]);


        if (result.length == 0)
            return res.status(404).json({ message: 'Product not found' });

        res.json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createProduct = (req, res) => {

    try {
        console.log(req.body);
        res.send('Creando Tareas.')

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateProduct = (req, res) => {

    try {
        res.send('Actualizando Tareas.')
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const deleteProduct = (req, res) => {
    try {
        res.send('Borrando Tareas.')
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}