import React, {Component} from 'react';
import CreditCard from './CreditCard.jsx';

// correct number: 4012-8888-8888-1881
//7768768686876888


export default class CreditCardInput extends Component {
  constructor(props) {
    super(props)

    // set default number and search box text to empty string
    this.state = {
      term: '',
    }

    this.invalidNumber = false;
    this.isNotANumber = false;
    this.showMessage = false;
    this.deleteKeyPress = false;

    // Take method and bind to class SearchBar, then replace method with
    // newly bound method
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    if (e.nativeEvent.which === 8) {
      this.deleteKeyPress = true;
    } else {
      this.deleteKeyPress = false;
    };
  }

  onInputChange(e) {

    //TODO try adding cardNumber to state



    // Update state as you type in the search box
    this.setState({term: e.target.value});

    if (this.state.term.length === 3 || this.state.term.length === 8 || this.state.term.length === 13) {
      this.deleteKeyPress ? this.setState({term: e.target.value }) : this.setState({term: e.target.value + "-"});
    }
    else if (this.state.term.length === 19 || e.target.value.length === 19) {
      this.onSubmitForm(e.target.value);
    } else if (this.state.term.length < 19) {
      this.showMessage = false;
      this.invalidNumber = false;
    }
  }

  onSubmitForm(e) {

    this.validateCardNumber(e);

  }

  validateCardNumber(number) {
    var numberToArray = number.toString().split('');

    var filterOutHyphen = numberToArray.filter(function(char) {
      return char !== '-';
    });

    // convert array of strings to numbers
    var cardNumber = filterOutHyphen.map(function(num) {
      return Number(num);
    });

    var checkSum = cardNumber[cardNumber.length - 1];
    var cardLength = cardNumber.length;
    var numbersToAdd = [];
    var doubleNumber;
    var sum;
    var total;

    for (var i = 0; i < cardNumber.length; i++) {
      if (isNaN(cardNumber[i])) {
        this.invalidNumber = true;
        this.isNotANumber = true;
        console.log("yes");
        return "value entered is not a number";
      } else {
        this.isNotANumber = false;
      };
    }

 // TODO: if you delete all the numbers in input, don't run reduce
    // Luhn Algorithm
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
      this.invalidNumber = false;
      this.showMessage = true;
      return "Credit card number is valid";
    } else {
      console.log("Credit card number is invalid")
      this.invalidNumber = true;
      return "Credit card number is invalid";
    };
  }

  render() {
    return (
      <div>
        <CreditCard cardNumber={this.state.term}/>
      <div className="error-message">{this.invalidNumber ? this.isNotANumber ? <p className="error-text">Please enter <span className="num-text">numbers</span> only </p> : <p className="error-text">Card Number is Incorrect</p> : this.showMessage ? <p className="no-error-show">Card Number is Correct</p> : <p className="no-error-transparent">Card Number is Correct</p> }</div>
      <div className="form-container">
        <form className="form">
          <div className="form-group" id="search-container">
            <i className="fa fa-credit-card"></i>
            <input className="form-input" id="search-input" maxLength={19} onKeyDown={this.onKeyDown} onChange={this.onInputChange} placeholder="4012-8888-8888-1881" value={this.state.term}/>
          </div>
        </form>
      </div>
    </div>
    );
  }
}
