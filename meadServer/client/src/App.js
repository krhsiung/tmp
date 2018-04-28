import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import Select from 'react-select';
import './App.css';
import 'react-select/dist/react-select.css';


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
    console.log("Selected for data: " + this.selected);
    if (this.selected !== '')
    {
      fetch('/api/batchData/' + this.selected)
        .then(res => res.json())
        .then(data => this.setState({ batchData: data }));
    }
  }


  // updateSelected(newSelection)
  updateSelected = (newSelection) =>
  {
    console.log("New selection: " + newSelection);
    this.selected = newSelection;
    this.setState({ selected: newSelection });
    this.getData();
  }

  render()
  {
    const { batchData } = this.state;
    const { selected } = this.state;

    var batchNamesJSON = [];
    var i = 0;
    for (let name of this.state.batchNames)
    {
      batchNamesJSON.push({value: i, label: name});
      i++;
    }

    return (
      <div className="App">
      {
        <div>
          <h1>Mead Fermentation Temperature Monitoring</h1>
          <Select
            id="batch-select"
            ref={(ref) => { this.select = ref; }}
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            autoFocus
            options={ batchNamesJSON }
            simpleValue
            clearable={false}
            name="selected-batch"
            disabled={false}
            value={{label: selected}}
            onChange=
            {(val) =>
              {
                if (val !== null)
                {
                  this.updateSelected(batchNamesJSON[val].label);
                }
              }
            }
            searchable={true}
            rtl={false}
          />

          <LineChart
            data={[
              batchData
            ]}
            datePattern={'%Y-%m-%d-%H:%M'}
            xType={'time'}
            xTicks={20}
            axes
            grid
            verticalGrid
            yDomainRange={[50, 90]}
            axisLabels={{x: 'Time', y: 'Temperature (F)'}}
            height={600}
            width={900}
          />
        </div>
      }
      </div>
    );
  }
}

export default App;