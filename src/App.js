import React from 'react'
import './App.css'
import ReminderContextProvider from './ReminderContext'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { CalendarHome } from './layout/CalendarHome'
import { Month } from './components/Month'

function App() {
  return (
    <ReminderContextProvider>
      <HashRouter>
        <CalendarHome>
          <Switch>
            <Route path='/:year/:month' component={Month} />
            <Route path='/' exact component={Month} />
          </Switch>
        </CalendarHome>
      </HashRouter>
    </ReminderContextProvider>
  )
}

export default App
