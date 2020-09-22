import React, { useContext, useState } from 'react'
import { ReminderContext } from '../../contexts/ReminderContext'
import styled from 'styled-components'
import Modal from 'react-modal'
import ReminderForm from '../Form'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'

const OptionButton = styled.div`
  cursor: pointer;
  font-size: 16px;
`
const ReminderWrapper = styled.div`
  position: relative;
  font-size: 12px;
  cursor: pointer;
  margin: 2px;
  border-radius: 12px;
`
const CircleColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;
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

function Reminder(props) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setPopoverOpen(false)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const toggle = () => setPopoverOpen(!popoverOpen)

  const { dispatch } = useContext(ReminderContext)

  return (
    <ReminderWrapper
      id={`id-${props.reminder.id}`}
      className='d-flex flex-wrap p-1'
      style={{ background: props.reminder.color }}>
      <div className='d-flex w-100 '>
        <div className='text-truncate pl-2'>
          {props.reminder.time} {props.reminder.name}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <ReminderForm
          currentDayReminder={props.date}
          editReminder={props.reminder}
          closeModalClick={closeModal}
        />
      </Modal>
      <Popover
        placement='bottom'
        isOpen={popoverOpen}
        target={`id-${props.reminder.id}`}
        toggle={toggle}>
        <PopoverHeader className='d-flex align-items-center'>
          <CircleColor style={{ background: props.reminder.color }} />
          <div className='mr-auto w-75'>{props.reminder.name}</div>
          <div onClick={() => setPopoverOpen(false)}>
            <i className='fas fa-times text-dark' />
          </div>
        </PopoverHeader>
        <PopoverBody>
          <div className='d-flex w-100 align-items-center'>
            <div className='mr-auto text-capitalize'>{props.reminder.city}</div>
            <div className='text-capitalize'>{props.reminder.weather}</div>
          </div>
          <div className='d-flex align-items-center'>
            <div className='mr-auto'>{props.reminder.time}</div>
            <OptionButton onClick={openModal}>
              <i className='fas fa-edit text-info pr-1' />
            </OptionButton>
            <OptionButton
              onClick={() => {
                dispatch({ type: 'REMOVE_REMINDER', id: props.reminder.id })
              }}>
              <i className='fas fa-trash text-danger' />
            </OptionButton>
          </div>
        </PopoverBody>
      </Popover>
    </ReminderWrapper>
  )
}

export default Reminder
