import React from 'react';
import {Component} from 'react';

export default class CreditCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="credit-card">
            <h1>Camden Kredit</h1>
            <h2>{this.props.cardNumber}</h2>
        </div>
      </div>
    );
  }
}
