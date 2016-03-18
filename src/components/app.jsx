import React from 'react';
import {Component} from 'react';
import CreditAlgo from './creditCardValidation/credit-algo-container';

const App = (props) => {
  return(
    <div>
      <div className="container">
        <CreditAlgo />
      </div>
    </div>
  );
}

export default App;
