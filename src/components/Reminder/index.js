import React, { useContext } from 'react'
import { ReminderContext } from '../../ReminderContext'

function Reminder(props) {
  const { dispatch } = useContext(ReminderContext)
  return (
    <div>
      <div>{props.reminder.name}</div>
      <div>{props.reminder.hour}</div>
      <div>{props.reminder.city}</div>
      <div>{props.reminder.color}</div>
      <div
        onClick={() =>
          dispatch({ type: 'REMOVE_REMINDER', id: props.reminder.id })
        }>
        delete
      </div>
    </div>
  )
}

export default Reminder
