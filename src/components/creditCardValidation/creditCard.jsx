import React from 'react';
import {Component} from 'react';

const CreditCard = (props) => {
  return (
    <div className="credit-card">
      <h1>Camden Kredit</h1>
      <h2>{props.cardNumber}</h2>
      <label className="card-holder-label">CARD HOLDER</label>
      <h3 className="card-holder-text">{props.cardHolder}</h3>
      <label className="expDate-label">VALID<br></br>THRU</label>
      <h3 className="expMonth-text">{props.expMonth}</h3>
      <h3 className="expYear-text">{props.expYear}</h3>
    </div>
  );
}

export default CreditCard;
