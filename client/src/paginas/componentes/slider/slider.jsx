import React from 'react';
import '../slider/slider.css';

// const Logo2 = require('../../images/UAC.png');
// const Logo3 = require('../../images/cuscorecicla.jpg');
// const Logo4 = require('../../images/1_goi_ing sistemas.png');
// const Logo5 = require('../../images/ieee.png');
import Logo2 from '../../images/UAC.png';
import Logo3 from '../../images/cuscorecicla.jpg';
import Logo4 from '../../images/1_goi_ing sistemas.png';
import Logo5 from '../../images/ieee.png';

const SliderSection = () => {
  return (
    <div className="slider">
      <div className="slide-track">
        <div className="slider">
          <img src={Logo2} alt="Logo 2" />
        </div>
        <div className="slider">
          <img src={Logo3} alt="Logo 3" />
        </div>
        <div className="slider">
          <img src={Logo4} alt="Logo 4" />
        </div>
        <div className="slider">
          <img src={Logo5} alt="Logo 5" />
        </div>
        <div className="slider">
          <img src={Logo2} alt="Logo 2" />
        </div>
        <div className="slider">
          <img src={Logo3} alt="Logo 3" />
        </div>
        <div className="slider">
          <img src={Logo4} alt="Logo 4" />
        </div>
        <div className="slider">
          <img src={Logo5} alt="Logo 5" />
        </div>
        <div className="slider">
          <img src={Logo2} alt="Logo 2" />
        </div>
        <div className="slider">
          <img src={Logo3} alt="Logo 3" />
        </div>
        <div className="slider">
          <img src={Logo4} alt="Logo 4" />
        </div>
        <div className="slider">
          <img src={Logo5} alt="Logo 5" />
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
