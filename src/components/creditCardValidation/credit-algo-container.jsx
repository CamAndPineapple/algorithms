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
          <CreditCardInput />

        </div>
      </div>
    );
  }
}
