import { getTokenHeader } from "./getTokenHeader.js";
import { verifyAccessToken } from "./verifyToken.js";

export function authenticate(req, res, next) {
    const token = getTokenHeader(req.headers);
  
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({
        statusCode: 401,
        error: 'No Token Provided'
      });
    }
  
    try {
      const decoded = verifyAccessToken(token);
      if (!decoded) {
        console.log('Invalid token');
        return res.status(401).json({
          statusCode: 401,
          error: 'Invalid Token'
        });
      }

      req.user = decoded.user; // Asignar el usuario decodificado a req.user
      next();
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return res.status(500).json({
        statusCode: 500,
        error: 'Failed to authenticate token'
      });
    }
}