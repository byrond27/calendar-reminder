import React from 'react'
import './App.css'
import ReminderContextProvider from './ReminderContext'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { CalendarHome } from './layout/CalendarHome'
import { Month } from './components/Month'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    .bs-popover-auto{
      width: 100%;
      top: -56px !important;
    }
  }
`

function App() {
  return (
    <ReminderContextProvider>
      <HashRouter>
        <GlobalStyle whiteColor />
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
