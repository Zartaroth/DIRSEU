import React, { useState } from 'react';
import './mof.css';

const AccordionItem = ({ title, content, isOpen, toggleAccordion }) => (
  <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
    <button className="accordion-title" onClick={toggleAccordion}>
      {title}
      <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
    </button>
    <div className="accordion-content">
      {Array.isArray(content) ? (
        <ul className="function-list">
          {content.map((item, index) => (
            <li key={index}>
              <span className="arrow-icon">➤</span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </div>
  </div>
);

const Mof = ({ purpose, functions, backgroundImage }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const accordionData = [
    { title: 'Propósito', content: purpose },
    { title: 'Funciones Específicas', content: functions }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="background-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>
      <div className="accordion-container">
        <h2>Desarrollo en la Universidad</h2>
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            toggleAccordion={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Mof;
