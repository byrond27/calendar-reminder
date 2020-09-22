import React, { useContext } from 'react'
import _sortBy from 'lodash/sortBy'
import styled, { css } from 'styled-components'
import { Button } from 'reactstrap'
import moment from 'moment'
import Reminder from '../Reminder'
import ReminderForm from '../Form'
import Modal from 'react-modal'
import { ReminderContext } from '../../ReminderContext'

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
  height: 150px;
  overflow-y: auto;
  border: 1px solid black;

  ${createSpaceFirstDay()};
  .reminder-number {
    font-size: 12px;
    color: gray;
    padding-left: 5px;
  }
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
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
  },
}

export function Day(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }

  let styleDays = []
  let firstDayMonth =
    props.day === 1
      ? `position-first-day-${moment(props.date).startOf('month').format('d')}`
      : ''
  let currentDay =
    moment().format('YYYY-MM-DD') === props.date ? 'current-day' : ''

  let WeekendDay =
    moment(props.date).format('dddd') === 'Sunday' ||
    moment(props.date).format('dddd') === 'Saturday'
      ? 'weekend-day'
      : 'weekday'

  styleDays.push(firstDayMonth, currentDay, WeekendDay)

  const { reminders, dispatch } = useContext(ReminderContext)

  const reminderByDay = reminders.filter(
    (reminder) => reminder.date === props.date
  )

  const orderReminderByTime = _sortBy(reminderByDay, 'time')

  return (
    <DayWrapper className={styleDays.toString().replaceAll(',', ' ')}>
      <div className='d-flex header-day'>
        <div className='flex-grow-1 align-self-center day-number'>
          {props.day}
          {reminderByDay.length > 0 ? (
            <span className='reminder-number'>{reminderByDay.length}</span>
          ) : null}
        </div>
        {reminderByDay.length > 0 ? (
          <Button
            outline
            color='danger'
            size='sm'
            className='mr-1'
            onClick={() =>
              dispatch({
                type: 'REMOVE_ALL_DAY_REMINDER',
                date: props.date,
              })
            }>
            <i className='fas fa-trash' />
          </Button>
        ) : null}
        <Button outline color='primary' size='sm' onClick={openModal}>
          <i className='fas fa-plus' />
        </Button>
      </div>
      {orderReminderByTime.length > 0 ? (
        orderReminderByTime.map((reminder) => (
          <Reminder key={reminder.id} reminder={reminder} />
        ))
      ) : (
        <div className='d-flex justify-content-center'>No reminders</div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'>
        <ReminderForm
          currentDayReminder={props.date}
          closeModalClick={closeModal}
        />
      </Modal>
    </DayWrapper>
  )
}
