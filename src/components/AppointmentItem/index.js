// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleIsStarred} = props
  const {id, title, date, isStarred} = eachAppointment

  const URL = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const onClickStarIcon = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="itemContainer">
      <div className="content">
        <p className="title">{title}</p>
        <p className="date">
          Date : {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <button
        type="button"
        data-testid="star"
        className="star"
        onClick={onClickStarIcon}
      >
        <img src={URL} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
