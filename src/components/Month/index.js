import React from 'react'
import Header from '../Header'
import HeaderDays from '../HeaderDays'
import { Day } from '../Day'
import moment from 'moment'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'

const DaysWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`

export function Month(props) {
  const currentMonthDate =
    props.match.params.year && props.match.params.month
      ? `${props.match.params.year}-${props.match.params.month}`
      : moment().format('YYYY-MM')

  const nextMonthDate = moment(currentMonthDate).add(1, 'M').format('YYYY-MM')
  const previousMonthDate = moment(currentMonthDate)
    .subtract(1, 'M')
    .format('YYYY-MM')

  const currentMonth = {
    date: currentMonthDate,
    name: moment(currentMonthDate).format('MMMM YYYY'),
    days: moment(currentMonthDate).daysInMonth(),
    editDay: null,
  }
  const nextMonth = {
    date: nextMonthDate,
    slug: nextMonthDate.replace('-', '/'),
  }

  const previousMonth = {
    date: previousMonthDate,
    slug: previousMonthDate.replace('-', '/'),
  }

  const [setIsOpen] = React.useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const days = []

  for (let i = 1; i <= currentMonth.days; i++) {
    days.push(
      <Day
        key={i}
        date={currentMonth.date + '-' + i.toString().padStart(2, '0')}
        day={i}
        openModalReminder={openModal}
      />
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header
            currentMonth={currentMonth}
            nextMonth={nextMonth}
            prevMonth={previousMonth}
          />
          <HeaderDays />
          <DaysWrapper>{days}</DaysWrapper>
        </Col>
      </Row>
    </Container>
  )
}
