import React from 'react';
import {Component} from 'react';
import CreditCardInput from './creditCard-input';


export default class CreditAlgo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="container algo-container" id="test">
          <h1>Credit Card Validator </h1>
          <CreditCardInput />
          
        </div>
      </div>
    );
  }
}
