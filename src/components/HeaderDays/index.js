import React from 'react'
import styled from 'styled-components'

const HeaderCalendar = styled.div`
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  div {
    flex: 1 0 14.28%;
  }
`
const headerDays = () => (
  <HeaderCalendar>
    <div>Sunday</div>
    <div>Monday</div>
    <div>Tuesday</div>
    <div>Wednesday</div>
    <div>Thursday</div>
    <div>Friday</div>
    <div>Saturday</div>
  </HeaderCalendar>
)

export default headerDays
