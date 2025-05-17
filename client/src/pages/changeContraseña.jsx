import React, { useState } from 'react';
import { changePasswordRequest } from '../api/api';
import { useAuth } from '../context/AuthProvider';

const ChangePassword = () => {
    const { getaccessToken, getUser } = useAuth(); // Obtener token y usuario desde el contexto
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const accessToken = getaccessToken();
        const userData = getUser(); // Obtener información del usuario
        const userId = userData?.user_id;

        if (!accessToken || !userId) {
            setError('No se encontró el token de autenticación o el ID de usuario');
            return;
        }

        try {
            const response = await changePasswordRequest(accessToken, userId, currentPassword, newPassword);
            setMessage(response.message);
            setError('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setError(error.message || 'Error al cambiar la contraseña');
            setMessage('');
        }
    };

    return (
        <div className="change-password-container">
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handleSubmit} className="change-password-form">
                <div className="form-group">
                    <label>Contraseña actual:</label>
                    <input
                        type="password"
                        placeholder="Introduce tu contraseña actual"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nueva contraseña:</label>
                    <input
                        type="password"
                        placeholder="Introduce tu nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirmar nueva contraseña:</label>
                    <input
                        type="password"
                        placeholder="Confirma tu nueva contraseña"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Cambiar contraseña</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <style>{`
                .change-password-container {
                    max-width: 400px;
                    margin: auto;
                    margin-top: 100px;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
                    background-color: #f9f9f9;
                }
                .change-password-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                .form-group label {
                    margin-bottom: 5px;
                    font-weight: 600;
                    color: #333;
                }
                .form-group input {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }
                .submit-button {
                    padding: 10px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;
                    background-color: #007bff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .submit-button:hover {
                    background-color: #0056b3;
                }
                .success-message {
                    color: green;
                    font-weight: bold;
                    margin-top: 10px;
                }
                .error-message {
                    color: red;
                    font-weight: bold;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};
export default ChangePassword;