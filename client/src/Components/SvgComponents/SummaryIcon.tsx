import React from 'react';
import { ReactComponent as SummaryIcon } from '../../Assets/summary.svg';
import './icons.scss';
import { Link } from 'react-router-dom';

const SummaryIconComponent = () => {
  return (
    
    <div className="summaryicon-container">
      <div className="summaryicon-container__summaryicon-bubble">
    <Link to="/summary">
      <SummaryIcon className="summaryicon-container__summaryicon-bubble--icon" />
       </Link>
    </div>
    </div>
  );
};

export default SummaryIconComponent;
