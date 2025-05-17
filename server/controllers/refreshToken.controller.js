import { getToken } from '../models/tokens.model.js';
import { generateAccessToken } from '../utils/generateToken.js';
import { getTokenHeader } from '../utils/getTokenHeader.js';
import { verifyRefreshToken } from '../utils/verifyToken.js';

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = getTokenHeader(req.headers);


        if (!refreshToken) {
            return res.status(401).json(
                {
                    statusCode: 401,
                    error: 'Sin Autorizacion'
                });
        }

        const found = await getToken(refreshToken);


        if (!found) {
            return res.status(401).json(
                {
                    statusCode: 401,
                    error: 'Sin Autorizacion'
                });
        }

        const payload = verifyRefreshToken(found.token);

        if (!payload) {
            return res.status(401).json(
                {
                    statusCode: 401,
                    error: 'Sin Autorizacion'
                });
        }

        const accessToken = generateAccessToken(payload.user);

        res.status(200).json(
            {
                statusCode: 200,
                accessToken,
            });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
