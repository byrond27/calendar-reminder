import React from 'react'
import _sortBy from 'lodash/sortBy'
import styled, { css } from 'styled-components'
import { Button } from 'reactstrap'
import moment from 'moment'

function createSpaceFirstDay() {
  let styles = ''

  for (let i = 0; i < 7; i += 1) {
    styles += `
    &.position-first-day-${i} {
      margin-left: ${14.28 * i}%;
      }
    `
  }

  return css`
    ${styles}
  `
}

const DayWrapper = styled.div`
  position: relative;
  flex: 1 0 14.28%;
  max-width: calc(100% / 7);
  min-height: 150px;
  border: 1px solid black;

  ${createSpaceFirstDay()};

  .header-day {
    padding: 10px;
    border-bottom: 1px solid black;
    font-weight: bold;
  }

  &.current-day {
    background: #d2d3f3 !important;
  }

  &.weekend-day {
    background: #f0f0f0;

    .day-number {
      color: #2a9df4;
    }
  }

  &.weekday {
  }
`

const defaultColor = '#000'

export default class Day extends React.Component {
  state = {
    editReminder: {
      id: null,
      time: null,
      description: null,
      color: defaultColor,
    },
  }

  handleSetColor = (data) => {
    this.setState({
      editReminder: {
        ...this.state.editReminder,
        color: data.color,
      },
    })
  }

  handleSetEdit = (reminder) => {
    this.props.handleSetEditDay(this.props.day)

    this.setState({
      editReminder: {
        ...this.state.editReminder,
        ...reminder,
      },
    })
  }

  handleCreateUpdateReminder = (e, update) => {
    console.log('hola')
    e.preventDefault()

    const form = e.target
    const description = form.querySelector('.description').value.trim()

    if (description.length) {
      const payload = {
        date: this.props.date,
        time: form.querySelector('.rc-time-picker-input').value,
        description: description,
        color: this.state.editReminder.color || defaultColor,
      }

      if (update.id) {
        payload['id'] = update.id
        this.props.updateReminder(payload)
      } else {
        this.props.createReminder(payload)
      }

      this.props.handleSetEditDay(null)
      this.setState({ editReminder: {} })
    }
  }

  handleDeleteReminder = (id) => {
    this.props.deleteReminder(this.props.date, id)
  }

  render() {
    const reminders = []
    let firstDayMonth =
      this.props.day === 1
        ? `position-first-day-${moment(this.props.date)
            .startOf('month')
            .format('d')}`
        : ''

    let currentDay =
      moment().format('YYYY-MM-DD') === this.props.date ? 'current-day' : ''

    let WeekendDay =
      moment(this.props.date).format('dddd') === 'Sunday' ||
      moment(this.props.date).format('dddd') === 'Saturday'
        ? 'weekend-day'
        : 'weekday'

    return (
      <DayWrapper
        className={firstDayMonth + ' ' + currentDay + ' ' + WeekendDay}>
        {!this.props.editDay && (
          <div
            className='d-flex header-day'
            onClick={() => this.props.handleSetEditDay(this.props.day)}>
            <div className='flex-grow-1 align-self-center day-number'>
              {this.props.day}
            </div>
            <Button outline color='danger' size='sm' className='mr-1'>
              <i className='fas fa-trash' />
            </Button>
            <Button outline color='primary' size='sm'>
              <i className='fas fa-plus' />
            </Button>
          </div>
        )}
        <div className='d-flex justify-content-center'>No reminders</div>
      </DayWrapper>
    )
  }
}
