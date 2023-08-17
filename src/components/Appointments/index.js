// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', starredButton: false}

  toggleStarredButton = () => {
    this.setState(prevState => ({starredButton: !prevState.starredButton}))
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  render() {
    const {title, date, appointmentsList, starredButton} = this.state

    const starredButtonClassName = starredButton
      ? 'buttonStarredTrue'
      : 'buttonStarredFalse'
    let filteredList = []
    if (starredButton === true) {
      filteredList = appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    } else {
      filteredList = appointmentsList
    }
    return (
      <div className="bgContainer">
        <div className="card">
          <div className="topSection">
            <div className="topSection_left">
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={this.onChangeTitle}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  id="date"
                  className="input"
                  value={date}
                  onChange={this.onChangeDate}
                  placeholder="dd/mm/yyyy"
                  type="date"
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              className="image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <div className="bottom_section">
            <div className="Appointments_heading">
              <h1>Appointments</h1>
              <button
                className={starredButtonClassName}
                type="button"
                onClick={this.toggleStarredButton}
              >
                Starred
              </button>
            </div>
            <ul className="AppointmentsList">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
