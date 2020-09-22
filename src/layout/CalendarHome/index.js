import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'

export const CalendarHome = ({ children }) => (
  <Container className='mt-4'>
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
)
