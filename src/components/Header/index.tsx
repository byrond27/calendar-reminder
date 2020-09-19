import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

const header = () => (
  <Container>
    <Row>
      <Col className='d-flex justify-content-center align-items-center'>
        <Link to={'/'}>
          <i className='fas fa-arrow-left' />
        </Link>
      </Col>
      <Col className='d-flex justify-content-center align-items-center'>
        <h2>Septiembre</h2>
      </Col>
      <Col className='d-flex justify-content-center align-items-center'>
        <Link to={'/'}>
          <i className='fas fa-arrow-right' />
        </Link>
      </Col>
    </Row>
  </Container>
)

export default header
