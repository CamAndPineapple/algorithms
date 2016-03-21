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
            <label className="card-holder-label">CARD HOLDER</label>
            <h3 className="card-holder-text">{this.props.cardHolder}</h3>
            <label className="expDate-label">VALID <br></br> THRU</label>
            <h3 className="expMonth-text">{this.props.expMonth}</h3>
            <h3 className="expYear-text">{this.props.expYear}</h3>
        </div>
      </div>
    );
  }
}
