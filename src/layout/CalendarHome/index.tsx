import * as React from 'react'
import { CalendarContextConsumer } from '../../CalendarContext'
import { Container, Row, Col } from 'reactstrap'

export const CalendarHome = ({ children }) => (
  <CalendarContextConsumer>
    {(appContext) =>
      appContext && (
        <Container>
          <Row>
            <Col>
              Name: {appContext.name}, Author: {appContext.author}, Url:{' '}
              {appContext.url}
              {children}
            </Col>
          </Row>
        </Container>
      )
    }
  </CalendarContextConsumer>
)
