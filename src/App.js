import React from 'react';
import {Tabs, Tab, Button, Table} from 'react-bootstrap';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker/react'
import {tasks} from './tasks'

import './App.css';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'map',
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({tasks})
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    console.log(this.state)
    return (
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="map" title="Map">
            <div className="App">
              <Map center={[48.856614, 2.3522219]} zoom={11} width={this.state.width} height={this.state.height * 0.75}>
                {
                  tasks.map(task => (
                    <Marker anchor={[task.lat, task.lng]} payload={1} onClick={this.handleMarkerClick} />
                  ))
                }
              </Map>
              <Button color="info">Call next guest</Button>{' '}
            </div>
          </Tab>
          <Tab eventKey="schedule" title="Schedule">
            <Table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr>
              <th>{task.dueTime}</th>
              <td>Paris</td>
              <td>0628764802</td>
            </tr>
          ))}
        </tbody>
      </Table>
          </Tab>
        </Tabs>
    );
  }
}

export default App;
