import React, { Component } from 'react';
import './App.css';

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

  getData = () =>
  {
    fetch('/api/batchData')
      .then(res => res.json())
      .then(batchData => this.setState({ batchData }))
  }

  render()
  {
    const { batchNames } = this.state.batchNames;
    const { batchData } = this.state.batchData;

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
            {
              batchNames.map((name, index) =>
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

            <h1>Batch Data</h1>
            <u1 className="batchData">
            {
              batchData.map((data, index) =>
                <li key = {data.sample_time}>
                  {data}
                </li>
            )}
            </u1>
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