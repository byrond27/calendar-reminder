import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'
import moment from 'moment'

const HeaderCalendar = styled.div`
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  background-color: #2a9df4;
  color: white;
  text-align: center;
  div {
    flex: 1 0 14.28%;
  }
`

const headerDays = (props) => (
  <Row>
    <Col>
      <HeaderCalendar>
        {moment.weekdays().map((day, i) => (
          <div key={i} className='p-2'>
            {day}
          </div>
        ))}
      </HeaderCalendar>
    </Col>
  </Row>
)

export default headerDays
