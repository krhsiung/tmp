import React, { Component } from 'react';
import './App.css';

class App extends Component
{
  // Initialize state
  state =
  {
    batchNames: [],
    batchData: [],
    selected: ''
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
    if (this.selected !== '')
    {
      fetch('/api/batchData/' + this.selected)
        .then(res => res.json())
        .then(batchData => this.setState({ batchData }));
    }
  }

  render()
  {
    const { batchNames } = this.state;
    const { batchData } = this.state;

    return (
      <div className="App">
      {
        batchNames.length ? (
          <div>
            <h1>Batch Names</h1>
            <ul className="batchNames">
            {batchNames.map((name, index) =>
              <li key={index}>
                <button
                  onClick=
                  {() =>
                    {
                      this.selected = name;
                      this.getData();
                    }
                  }>
                  {name}
                </button>
              </li>
            )}
            </ul>
            <h1> Batch Data</h1>
            <u1 className="batchData">
            {batchData.map((name, index) =>
              <li key={index}>
                {name.sample_time + "\t:\t" + name.temperature + "F"}
              </li>
            )}
            </u1>
          </div>
        ) : (
          <div>
            <h1>No names :(</h1>
            <h1>No data :(</h1>
          </div>
        )}
      </div>
    );
  }
}

export default App;