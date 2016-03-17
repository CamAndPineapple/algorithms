import React from 'react';
import {Component} from 'react';
import SearchBar from './search-bar';

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="container">
          <SearchBar/>
        </div>
      </div>
    );
  }
}
