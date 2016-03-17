import React, {Component} from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props)

    // set default color and search box text to empty string
    this.state = {
      term: '',
      color: '#D21A1A'
    }

    // Take method and bind to class SearchBar, then replace method with
    // newly bound method
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onInputChange(e) {

    // Update state as you type in the search box
    this.setState({
      term: e.target.value,
      color: e.target.value
    });
  }

  // Could update color via form submit if you wanted to
  onSubmitForm(e) {
    e.preventDefault();

    // If search box is empty, don't update color
    if (this.state.term === '') {
      return;
    }
    // Update this.state.color to text in search box
    this.setState({color: this.state.term});
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.onSubmitForm} className="form">
          <div className="form-group" id="search-container">
            <i className="fa fa-search"></i>
            <input className="form-input" id="search-input"
              onChange={this.onInputChange}
              placeholder="Search for your favorite color"
              value={this.state.term}/>
          </div>
        </form>

      </div>

    );
  }
}
