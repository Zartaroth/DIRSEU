import { useState } from 'react';
import { createOptionRequest } from '../../api/api';

const OptionForm = ({ questionId, onOptionCreated }) => {
    const [optionText, setOptionText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const optionData = { texto: optionText, pregunta_id: questionId };
        try {
            const option = await createOptionRequest(optionData);
            onOptionCreated(option);
        } catch (error) {
            console.error("Error al crear la opción:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Texto de la Opción</label>
                <input type="text" value={optionText} onChange={(e) => setOptionText(e.target.value)} required />
            </div>
            <button type="submit">Agregar Opción</button>
        </form>
    );
};

export default OptionForm;
