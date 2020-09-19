import * as React from 'react'
import { CalendarContextConsumer } from '../../CalendarContext'

export const CalendarHome = () => (
  <CalendarContextConsumer>
    {(appContext) =>
      appContext && (
        <div>
          Name: {appContext.name}, Author: {appContext.author}, Url:{' '}
          {appContext.url}
        </div>
      )
    }
  </CalendarContextConsumer>
)
