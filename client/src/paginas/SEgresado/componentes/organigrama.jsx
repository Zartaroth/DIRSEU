import React from 'react';

// Componente para cada nodo del organigrama
const OrganigramaNode = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
    <div style={{
      border: '2px solid #333',
      borderRadius: '8px',
      padding: '10px',
      margin: '10px',
      backgroundColor: '#f0f0f0',
      minWidth: '120px',
      maxWidth: '80%',
      textAlign: 'center',
      fontWeight: 'bold',
      position: 'relative',
      fontSize: '1rem'
    }}>
      {label}
    </div>
    {children && (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '20px',
        width: '100%'
      }}>
        {/* Línea vertical para conectar al nodo padre */}
        <div style={{
          position: 'absolute',
          top: '0',
          width: '2px',
          height: '20px',
          backgroundColor: '#333'
        }} />
        {/* Contenedor para los nodos hijos */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap', // Ajuste para móviles
          marginTop: '10px',
          width: '100%'
        }}>
          {children}
        </div>
      </div>
    )}
  </div>
);

export default function Organigrama() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      backgroundColor: '#ffffff',
      minHeight: '50vh',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {/* Nodo principal */}
      <OrganigramaNode label="UAC">
        <img
          src="https://th.bing.com/th/id/OIP.45nMfjEDv4Rh9c-H-eG3MQHaGt?rs=1&pid=ImgDetMain"
          alt="UAC"
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '80px',
            borderRadius: '10%',
            border: '3px solid #333',
            marginBottom: '-40px'
          }}
        />
        {/* Director de Operaciones con hijos */}
        <OrganigramaNode label="Vicerrectorado Académico">
          <OrganigramaNode label="Dirección de Responsabilidad Social y Extensión Universitaria">
            <OrganigramaNode label="Coordinación del Sistema de Seguimiento al Egresado" />
          </OrganigramaNode>
        </OrganigramaNode>
      </OrganigramaNode>
    </div>
  );
}
