import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import { obtenerEventosCalendario } from '../../../api/calendario'; // Importa la función de API

// Estilos personalizados
const CalendarioContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
`;

const Titulo = styled.h2`
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FullCalendarStyled = styled(FullCalendar)`
  .fc-toolbar-title {
    font-size: 20px;
    color: #34495e;
  }
  .fc-button {
    background-color: #16a085;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .fc-button:hover {
    background-color: #1abc9c;
  }
  .fc-daygrid-day {
    border: 1px solid #ecf0f1;
  }
  .fc-daygrid-event {
    background-color: #27ae60 !important;
    color: white !important;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    padding: 2px 5px;
  }
`;

const CalendarioAmbiental = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const datos = await obtenerEventosCalendario();
        const eventosTransformados = datos.map((evento) => ({
          title: evento.titulo,
          start: evento.fecha,
          description: evento.descripcion,
          url: evento.enlace,
          color: '#27AE60',
        }));
        setEventos(eventosTransformados);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };

    cargarEventos();
  }, []);

  const handleDateClick = (info) => {
    alert(`Has hecho clic en el día: ${info.dateStr}`);
  };

  const handleEventClick = (info) => {
    info.jsEvent.preventDefault();
  
    const { url, title, extendedProps } = info.event;
  
    if (url) {
      window.open(url, '_blank');
    } else {
      alert(`Evento: ${title}\nDescripción: ${extendedProps.description}`);
    }
  };

  return (
    <CalendarioContainer>
      <Titulo>Calendario Ambiental</Titulo>
      <FullCalendarStyled
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        events={eventos}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDisplay="block"
        eventColor="#16A085"
        locale="es"
      />
    </CalendarioContainer>
  );
};

export default CalendarioAmbiental;
