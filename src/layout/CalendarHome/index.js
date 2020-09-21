import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'

export const CalendarHome = ({ children }) => (
  <Container>
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
)
