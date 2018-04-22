import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { names: [] }

  // Fetch names after first mount
  componentDidMount() {
    this.getNames();
  }

  getNames = () => {
    // Get the names and store them in state
    fetch('/api/data')
      .then(res => res.json())
      .then(names => this.setState({ names }));
  }

  render() {
    const { names } = this.state;

    return (
      <div className="App">
        {/* Render the names if we have them */}
        {names.length ? (
          <div>
            <h1>2 names.</h1>
            <ul className="names">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of names, and they never
                change positions in the array.
              */}
              {names.map((name, index) =>
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