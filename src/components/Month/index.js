import React from 'react'
import Header from '../Header'
import HeaderDays from '../HeaderDays'
import Day from '../Day'
import moment from 'moment'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'

const DaysWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`

export default class Month extends React.Component {
  state = {}

  handleSetEditDay = (day) => {
    this.setState({
      currentMonth: {
        ...this.state.currentMonth,
        editDay: day,
      },
    })
  }

  buildDays(currentMonth) {
    const days = []
    const props = {
      editDay: currentMonth.editDay,
      handleSetEditDay: this.handleSetEditDay,
    }

    for (let i = 1; i <= currentMonth.days; i++) {
      props['date'] = currentMonth.date + '-' + i.toString().padStart(2, '0')
      props['day'] = i
      days.push(<Day key={i} {...props} />)
    }

    return days
  }

  render() {
    const currentMonthDate =
      this.props.match.params.year && this.props.match.params.month
        ? `${this.props.match.params.year}-${this.props.match.params.month}`
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
    console.log(currentMonth)

    const days = this.buildDays(currentMonth)

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
}
