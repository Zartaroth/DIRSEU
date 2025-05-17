import { deleteToken } from "../models/tokens.model.js";
import { getTokenHeader } from "../utils/getTokenHeader.js";

export const signOut = async (req, res) => {
    try {

        const refreshToken = getTokenHeader(req.headers);

        if (!refreshToken) {
            return res.status(401).json(
                {
                    statusCode: 401,
                    error: 'Sin Autorizacion'
                });
        }

        // BORRAR TOKEN DE BASE DATOS (MODEL TOKEN)
        deleteToken(refreshToken);

        res.status(200).json(
            {
                statusCode: 200,
                message: "Token Borrado",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            error: "Server Error",
        });
    }
}
