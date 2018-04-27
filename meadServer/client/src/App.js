import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import './App.css';

class App extends Component
{
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
        .then(data => this.setState({ batchData: data }));
    }
  }

  render()
  {
    const { batchNames } = this.state;
    const { batchData } = this.state;

    return (
      <div className="App">
      {
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
          <LineChart
            data={[
              batchData
            ]}
            datePattern={'%Y-%m-%d-%H:%M'}
            xType={'time'}
            xTicks={5}
            axes
            grid
            verticalGrid
            yDomainRange={[50, 90]}
            axisLabels={{x: 'Time', y: 'Temperature (F)'}}
            height={400}
            width={600}
          />
        </div>
      }
      </div>
    );
  }
}

export default App;