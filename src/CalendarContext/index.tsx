import * as React from 'react'

export interface CalendarContextInterface {
  name: string
  author: string
  url: string
}

const ctxt = React.createContext<CalendarContextInterface | null>(null)

export const CalendarContextProvider = ctxt.Provider

export const CalendarContextConsumer = ctxt.Consumer
