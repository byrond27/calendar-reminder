import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

const header = (props) => (
  <Row>
    <Col className='d-flex justify-content-center align-items-center'>
      <Link to={'/' + props.prevMonth.slug}>
        <i className='fas fa-arrow-left' />
      </Link>
    </Col>
    <Col className='d-flex justify-content-center align-items-center'>
      <h2>{props.currentMonth.name}</h2>
    </Col>
    <Col className='d-flex justify-content-center align-items-center'>
      <Link to={'/' + props.nextMonth.slug}>
        <i className='fas fa-arrow-right' />
      </Link>
    </Col>
  </Row>
)

export default header
