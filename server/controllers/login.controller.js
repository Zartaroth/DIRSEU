// Contiene la lógica de controladores para manejar las solicitudes HTTP.

import { getUserByEmail, comparePassword } from '../models/users.model.js';

import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

export const accessUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        if (!!!email || !!!password) {
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'Campos Requeridos'

                });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'Autenticacion fallida. Usuario no Encontrado'

                });
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'Autenticacion fallida. Contraseña Incorrecta'

                });
        }

        // Autenticar Usuario
        const accessToken = generateAccessToken({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user.id
        });

        const refreshToken = await generateRefreshToken({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user.id
        });

        res.status(200).json(
            {
                statusCode: 200,
                user,
                accessToken,
                refreshToken
            });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
