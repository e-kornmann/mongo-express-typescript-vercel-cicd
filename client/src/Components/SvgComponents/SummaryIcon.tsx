import React from 'react';
import { ReactComponent as SummaryIcon } from '../../Assets/summary.svg';
import './icons.scss';
import { Link } from 'react-router-dom';

const SummaryIconComponent = () => {
  return (
    <Link to="/summary" className="summaryicon-container">
      <SummaryIcon className="icon__summary" />
    </Link>
  );
};

export default SummaryIconComponent;
