import React from 'react';
import './politicas.css';

const cardData = [
  { title: "OBJETIVO GLOBAL", content: "El enfoque principal es integrar la responsabilidad social en la formación académica, la investigación y la gestión de proyectos que beneficien a la sociedad. La universidad busca fortalecer su rol en la mejora de la calidad de vida a través de una educación basada en valores éticos." },
  { title: "COMPROMISO INSTITUCIONAL", content: 
    "La universidad se compromete a gestionar su relación con la sociedad y el medio ambiente de manera ética, con el objetivo de contribuir al desarrollo sostenible y fortalecer nuestra participación en decisiones de gestión regional y local. Se busca formar profesionales competentes y ciudadanos responsables, promoviendo el bienestar común y la protección del ambiente." },
  { title: "COMPROMISOS ESPECÍFICOS", content: "Se establecen compromisos clave, como gestionar programas de proyección social y extensión universitaria con valores éticos, promover la participación en la toma de decisiones locales y regionales, implementar un plan de gestión ambiental sostenible, y fomentar hábitos saludables dentro de la institución." },
  { title: "PRINCIPALES PROGRAMAS", content: "Los programas incluyen proyección social y extensión universitaria, fortalecimiento de la gestión ambiental, vínculos con instituciones públicas y privadas, y la creación de un entorno universitario saludable. También se promueven el deporte y la inclusión de estos enfoques en la formación académica de los estudiantes." },
];

function Card({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default function Politicas() {
  return (
    <section className="background-section">
      <div className="overlay"></div>
      <div className="container">
        <h2>Politicas de Responsabilidad Social</h2>
        <div className="card-grid">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </section>
  );
}