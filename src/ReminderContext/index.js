import React, { createContext, useReducer, useEffect } from 'react'
import { calendarReducer } from '../reducers/calendarReducer'

export const ReminderContext = createContext()

const ReminderContextProvider = (props) => {
  const [reminders, dispatch] = useReducer(calendarReducer, [], () => {
    const currentMonth = []
    return currentMonth
  })
  useEffect(() => {
  }, [])

  return (
    <ReminderContext.Provider value={{ reminders, dispatch }}>
      {props.children}
    </ReminderContext.Provider>
  )
}

export default ReminderContextProvider
