import React from 'react'
import { Button, Table } from 'react-bootstrap'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker/react'
import axios from 'axios'
import AdminApp from './AdminApp'

import './App.css'

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    const urlParams = new URLSearchParams(window.location.search)

    this.state = {
      key: 'map',
      width: 0,
      height: 0,
      selectedTask: null,
      zoom: 12,
      center: [48.856614, 2.3522219],
      tasks: [],
      completedTasks: [],
      userId: urlParams.get('userId'),
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    if (this.state.userId !== 'admin') {
      const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
        url: `https://guarded-garden-24957.herokuapp.com/myTasks?userId=${this.state.userId}`,
      }
      axios(options).then(({ data }) => this.setState({ tasks: data }))
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  handleMarkerClick(taskId) {
    this.setState({ selectedTask: taskId })
  }

  toggleTask = taskId => {
    this.setState(prevState => {
      const taskIndex = prevState.completedTasks.findIndex(t => t === taskId)
      return {
        completedTasks:
          taskIndex === -1 ? [...prevState.completedTasks, taskId] : prevState.completedTasks.filter(t => t !== taskId),
      }
    })
  }

  isTaskDone = id => this.state.completedTasks.findIndex(t => t === id) !== -1

  render() {
    if (this.state.userId === 'admin') return <AdminApp />
    const { tasks } = this.state
    return (
      <div>
        <Map
          center={this.state.center}
          zoom={this.state.zoom}
          width={this.state.width}
          height={this.state.height * 0.5}
        >
          {tasks.map(task => (
            <Marker
              anchor={[task.lat, task.lng]}
              hover={task.id === this.state.selectedTask}
              onClick={() => this.handleMarkerClick(task.id)}
            />
          ))}
        </Map>
        <div style={{ width: this.state.width, height: this.state.height * 0.5, overflow: 'scroll' }}>
          <Table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Phone</th>
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr
                  style={task.id === this.state.selectedTask ? { backgroundColor: 'lightblue' } : {}}
                  onClick={() => {
                    this.setState({ selectedTask: task.id, zoom: 14, center: [task.lat, task.lng] })
                  }}
                >
                  <th>{task.dueTime}</th>
                  <td>0628764802</td>
                  <td>
                    <Button
                      variant={this.isTaskDone(task.id) ? 'secondary ' : 'primary'}
                      onClick={() => this.toggleTask(task.id)}
                    >
                      {this.isTaskDone(task.id) ? 'Done' : 'Mark as done'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default App
