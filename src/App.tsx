import React from 'react'
import './App.css'
import {
  CalendarContextInterface,
  CalendarContextProvider,
} from './CalendarContext'

import { CalendarHome } from './layout/CalendarHome'

const sampleAppContext: CalendarContextInterface = {
  name: 'Using React Context in a Typescript App',
  author: 'thehappybug',
  url: 'http://www.example.com',
}

function App() {
  return (
    <CalendarContextProvider value={sampleAppContext}>
      <CalendarHome />
    </CalendarContextProvider>
  )
}

export default App
