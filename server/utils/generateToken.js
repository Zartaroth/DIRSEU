import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getToken, saveToken } from '../models/tokens.model.js';

dotenv.config();

function sign(payload, isAccessToken) {
    return jwt.sign(
        payload,
        isAccessToken
            ? "c4d5994c-991d-4179-9102-97fff13959dd"
            : "e93f29a5-38b1-4630-a4c1-5d166a2ba4b7",
        {
            algorithm: "HS256",
            expiresIn: 3600,
        }
    );
}
// Función para generar el token de acceso
export function generateAccessToken(user) {
    return sign({ user }, true);
}

// Función para generar el token de actualización
export async function generateRefreshToken(user) {
    const refreshToken = sign({ user }, false);
    try {
        const existsToken = await getToken(refreshToken);

        if (!existsToken) {
            await saveToken(refreshToken);
        } else {
            console.log("Token ya registrado");
        }

        return refreshToken;
    } catch (error) {
        console.log(error);
    }

}

