import React, {Component} from 'react';
import CreditCard from './CreditCard.jsx';

// correct number: 4012-8888-8888-1881

export default class CreditCardInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '',
      cardHolder: '',
      expMonth: '',
      expYear: '',
      errorMessage: 'clearMessage',
      isNotANumber: false
    };

    // Replace methods with methods bound to CreditCardInput
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  // Checks if user presses the delete key
  onKeyDown(e) {
    if (e.nativeEvent.which === 8) {
      this.deleteKeyPress = true;
    } else {
      this.deleteKeyPress = false;
    }
  }

  onInputChange(e) {

    var cardNumber = this.state.cardNumber;
    var numLength = cardNumber.length;
    var numInput = e.target.value;
    var inputName = e.target.name;

    const deleteKeyPress = this.deleteKeyPress;
    const maxLength = 19;

    var userEnteredAllNumbers = inputName === "cardNumber" &&  numLength === maxLength;
    var userPastedAllNumbers = inputName === "cardNumber" && numInput.length === maxLength;

    // Update state as you type in the input fields
    this.setState({
      [e.target.name]: e.target.value
    });

    // Add hyphens to every group of 4 numbers entered
    if ([3, 8, 13].indexOf(numLength) > -1) {
      this.setState({
        cardNumber: deleteKeyPress ? numInput : numInput + "-"
      });
      // If user enters 19 numbers or copy/paste 19 numbers
      // into cardNumber input, submit form;
    } else if (userEnteredAllNumbers || userPastedAllNumbers) {
      this.onSubmitForm(numInput);
    } else if (numLength < maxLength) {
      this.setState({
        errorMessage: 'clearMessage'
      });
    }
  }

  onSelectChange(e) {
    if (e.target.name === "expMonth") {
      this.setState({
        [e.target.name]: e.target.value + "/"
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value.slice(2)
      });
    }
  }

  onSubmitForm(e) {
    this.validateCardNumber(e);
  }

  validateCardNumber(number) {

    var numberToArray = number.toString().split('');
    var filterOutHyphen = numberToArray.filter( char => char !== '-');

    // convert array of strings to numbers
    var cardNumber = filterOutHyphen.map( num => Number(num));
    var numLength = cardNumber.length;

    this.checkIfTypeNumber(cardNumber, numLength);
    this.luhnAlgorithm(cardNumber, numLength);
  }

  checkIfTypeNumber(number, length) {
    for (var i = 0; i < length; i++) {
      if (isNaN(number[i])) {
        this.setState({ isNotANumber: true });
      } else {
        this.setState({ isNotANumber: false });
        this.setState({ errorMessage: 'clearMessage'});
      }
    }
  }

  luhnAlgorithm(number, length) {

    var checkSum = number[number.length - 1];
    var numbersToAdd = [];
    var doubleNumber;
    var sum;
    var total;

    for (var i = length - 1; i >= 0; i--) {
      if (i === 15) {
        numbersToAdd.push(0);
      } else if (i % 2 === 0) {
        // if doubled number is greater than 10
        // add the two digits together i.e. 12 === 1 + 2 === 3
        if (number[i] * 2 - 10 >= 0) {
          doubleNumber = (number[i] * 2) % 10 + 1;
          numbersToAdd.push(doubleNumber);
        } else {
          numbersToAdd.push(number[i] * 2);
        }
      } else {
        numbersToAdd.push(number[i]);
      }
    }

    sum = numbersToAdd.reduce(function(a, b) {
      return a + b;
    }, 0);

    total = sum + checkSum;
    if (total % 10 === 0) {
      this.setState({ errorMessage: 'showCorrectMessage'});
    } else {
      if (this.state.isNotANumber) {
        this.setState({ errorMessage: 'notANumber' });
      } else {
        this.setState({ errorMessage: 'invalidNumber' });
      }
    }
  }
  render() {
    return (
      <div>
        <CreditCard cardNumber={this.state.cardNumber}
                    cardHolder={this.state.cardHolder}
                    expMonth={this.state.expMonth}
                    expYear={this.state.expYear}/>
                  <div className="error-message">{(() => {
                      switch(this.state.errorMessage) {
                        case 'notANumber': return <p className="error-text">Please enter <span className="num-text">numbers</span> only</p>;
                        case 'invalidNumber': return <p className="error-text">Card Number is Incorrect</p>;
                        case 'showCorrectMessage': return <p className="no-error-show">Card Number is Correct</p>;
                        case 'clearMessage': return <p className="no-error-transparent">Card Number is Correct</p>;
                      }
                    })()}
                  </div>
        <div className="form-container">
          <form className="form">
            <label>Card Number:</label>
            <div className={this.invalidNumber ? "form-group-error" : "form-group"}>
              <i className="fa fa-credit-card"></i>
              <input className="form-input"
                    id="search-input"
                    name="cardNumber"
                    maxLength={19}
                    onKeyDown={this.onKeyDown}
                    onChange={this.onInputChange}
                    placeholder="4012-8888-8888-1881"
                    value={this.state.cardNumber}/>
            </div>
            <label>Card Holder:</label>
            <div className="form-group">
              <i className="fa fa-user"></i>
              <input className="form-input"
                     type="text" name="cardHolder"
                     maxLength={24}
                     onChange={this.onInputChange}
                     placeholder="Your Name"
                     value={this.state.cardHolder}/>
            </div>
            <label>Expiration Date:</label>
            <div className="form-select">
              <div className="select">
                <select name="expMonth" onChange={this.onSelectChange}>
                  <option></option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div className="select">
                <select name="expYear" onChange={this.onSelectChange}>
                  <option></option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
