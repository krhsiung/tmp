import React, { Component } from 'react';
import './App.css';
var Select = require('react-select');


var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + JSON.stringify(val));
}

<Select
  name="form-field-name"
  value="one"
  options={options}
  onChange={logChange}
/>

class App extends Component
{
  // Initialize state
  state =
  {
    batchNames: [],
    batchData: []
  }

  // Fetch names after first mount
  componentDidMount()
  {
    this.getNames();
  }

  getNames = () =>
  {
    // Get the names and store them in state
    fetch('/api/batchNames')
      .then(res => res.json())
      .then(batchNames => this.setState({ batchNames }));
  }

  render()
  {
    const { batchNames } = this.state;

    return (
      <div className="App">
      {
        /* Render the names if we have them */
      }
      {
        batchNames.length ? (
          <div>
            <h1>Batch Names.</h1>
            <ul className="batchNames">
            {/*
              Generally it's bad to use "index" as a key.
              It's ok for this example because there will always
              be the same number of names, and they never
              change positions in the array.*/
            }
            {batchNames.map((name, index) =>
              <li key={index}>
                {name}
              </li>
            )}
            </ul>
            <button
              className="more"
              onClick={this.getNames}>
              Get More
            </button>
          </div>
        ) : (
        // Render a helpful message otherwise
          <div>
            <h1>No names :(</h1>
            <button
              className="more"
              onClick={this.getNames}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;