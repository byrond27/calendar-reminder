import React from 'react'
import './App.css'
import { CalendarContextProvider } from './CalendarContext'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { CalendarHome } from './layout/CalendarHome'
import Month from './components/Month'

const sampleAppContext = {
  name: 'Using React Context in a Typescript App',
  author: 'thehappybug',
  url: 'http://www.example.com',
}

function App() {
  return (
    <CalendarContextProvider value={sampleAppContext}>
      <HashRouter>
        <CalendarHome>
          <Switch>
            <Route path='/:year/:month' component={Month} />
            <Route path='/' exact component={Month} />
          </Switch>
        </CalendarHome>
      </HashRouter>
    </CalendarContextProvider>
  )
}

export default App
