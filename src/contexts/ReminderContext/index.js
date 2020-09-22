import React, { createContext, useReducer, useEffect } from 'react'
import { reminderReducer } from '../../reducers/ReminderReducer'

export const ReminderContext = createContext()

const ReminderContextProvider = (props) => {
  const [reminders, dispatch] = useReducer(reminderReducer, [], () => {
    const localState = localStorage.getItem('reminders')
    return localState ? JSON.parse(localState) : []
  })

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders))
  }, [reminders])

  return (
    <ReminderContext.Provider value={{ reminders, dispatch }}>
      {props.children}
    </ReminderContext.Provider>
  )
}

export default ReminderContextProvider
