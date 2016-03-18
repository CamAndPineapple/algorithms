import React, {Component} from 'react';

export default class CreditCardInput extends Component {
  constructor(props) {
    super(props)

    // set default number and search box text to empty string
    this.state = {
      term: '',
      cardNumber: 4430470088802415
    }

    // Take method and bind to class SearchBar, then replace method with
    // newly bound method
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onInputChange(e) {

    // Update state as you type in the search box
    this.setState({term: e.target.value});

    if (this.state.term.length === 16 || e.target.value.length === 16) {
      this.onSubmitForm(e.target.value);
    }
  }

  onSubmitForm(e) {

    this.validateCardNumber(e);

  }

  validateCardNumber(number) {
    var numberToArray = number.toString().split('');

    // convert array of strings to numbers
    var cardNumber = numberToArray.map(function(num) {
      return Number(num);
    });

    var checkSum = cardNumber[cardNumber.length - 1];
    var cardLength = cardNumber.length;
    var numbersToAdd = [];
    var doubleNumber;
    var sum;
    var total;

    if (isNaN(number)) {
      console.log("Value is not a number!");
      return "value entered is not a number";
    };

    for (var i = cardLength - 1; i >= 0; i--) {
      if (i === 15) {
        numbersToAdd.push(0);
      } else if (i % 2 === 0 && i !== 0) {
        // if doubled number is greater than 10
        // add the two digits together i.e. 12 === 1 + 2 === 3
        if (cardNumber[i] * 2 - 10 >= 0) {
          doubleNumber = (cardNumber[i] * 2) % 10 + 1;
          numbersToAdd.push(doubleNumber);
        } else {
          numbersToAdd.push(cardNumber[i] * 2);
        }
      } else if (i === 0) {
        if (cardNumber[i] * 2 - 10 >= 0) {
          doubleNumber = (cardNumber[i] * 2 % 10) + 1;
          numbersToAdd.push(doubleNumber);
        } else {
          numbersToAdd.push(cardNumber[i] * 2);
        }
      } else {
        numbersToAdd.push(cardNumber[i]);
      }
    }
    sum = numbersToAdd.reduce(function(a, b) {
      return a + b;
    });

    total = sum + checkSum;
    if (total % 10 === 0) {
      console.log("Credit card number is valid")
      return "Credit card number is valid";
    } else {
      console.log("Credit card number is invalid")
      return "Credit card number is invalid";
    };
  }

  render() {
    return (
      <div className="form-container">
        <form className="form">
          <div className="form-group" id="search-container">
            <i className="fa fa-credit-card"></i>
            <input className="form-input" id="search-input" maxLength={16} onChange={this.onInputChange} placeholder="4012888888881881" value={this.state.term}/>
          </div>
        </form>

      </div>

    );
  }
}
