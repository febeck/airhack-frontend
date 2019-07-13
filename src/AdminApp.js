import React from 'react';
import {ProgressBar, Table, Button, Tabs, Tab} from 'react-bootstrap';
import {tasks} from './tasks'

export default class AdminApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "taskers",
      selectedTasker: null,
      taskers:[
        {
          id: 1,
          name:"Fred",
          area:"Paris 18",
          statusPercent: 60,
          statusText: '6/10'
        },
        {
          id: 2,
          name:"Jeff",
          area:"Paris 13",
          statusPercent: 80,
          statusText: '4/5'
        },
        {
          id: 3,
          name:"Léa",
          area:"Levallois",
          statusPercent: 75,
          statusText: '3/4'
        },
        {
          id: 4,
          name:"Perrine",
          area:"Paris 2",
          statusPercent: 100,
          statusText: '11/11'
        },
        {
          id: 5,
          name:"Antoine",
          area:"Paris 16",
          statusPercent: 20,
          statusText: '1/5'
        },
        {
          id: 6,
          name:"Solène",
          area:"Paris 12",
          statusPercent: 67,
          statusText: '6/9'
        },
        {
          id: 7,
          name:"Coralie",
          area:"Paris 11",
          statusPercent: 25,
          statusText: '4/12'
        },
        {
          id: 8,
          name:"Ferdinand",
          area:"Clichy",
          statusPercent: 100,
          statusText: '4/4'
        },
      ]
    };
  }

  onSelect(tasker) {
    this.setState({selectedTasker: tasker})
  }

  render() {
    return <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
      <Tab eventKey="taskers" title="Taskers">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Area</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {this.state.taskers.map(tasker => (
            <tr
              key={tasker.id}
              style={this.state.selectedTasker && this.state.selectedTasker.id === tasker.id ? {backgroundColor: "lightblue"} : {}}
              onClick={() => this.onSelect(tasker)}
            >
              <td>{tasker.id}</td>
              <td>{tasker.name}</td>
              <td>{tasker.area}</td>
              <td><ProgressBar now={tasker.statusPercent} label={tasker.statusText} variant={tasker.statusPercent<=25 && "warning"}/></td>
            </tr>
          ))}
          </tbody>
        </Table>
        {this.state.selectedTasker &&
          <Button
            color="primary"
            size="lg"
            block
            style={{
              position: "absolute",
              bottom: 20,
            }}
          >
            Call {this.state.selectedTasker.name}
          </Button>
        }
        </Tab>
        <Tab eventKey="tasks" title="Unassigned tasks">
          <Table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Area</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr
                  style={
                    task.id === this.state.selectedTask
                    ? {backgroundColor: "lightblue"}
                    : {}
                  }
                >
                  <th>{task.dueTime}</th>
                  <td>{task.area}</td>
                  <td><Button variant="primary">Assign</Button></td>
                  <td><Button variant="danger">Cancel</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
  }
}
