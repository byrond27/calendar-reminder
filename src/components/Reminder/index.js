import React, { useContext } from 'react'
import { ReminderContext } from '../../ReminderContext'
import styled from 'styled-components'
import Modal from 'react-modal'
import ReminderForm from '../Form'

const OptionButton = styled.div`
  cursor: pointer;
`
const ReminderWrapper = styled.div`
  border-bottom: 1px dashed;
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
function Reminder(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const { dispatch } = useContext(ReminderContext)
  return (
    <ReminderWrapper
      className='d-flex flex-wrap p-1'
      style={{ background: props.reminder.color }}>
      <div className='d-flex w-100'>
        <div className='mr-auto text-truncate'>{props.reminder.name}</div>
      </div>
      <div className='d-flex w-100 align-items-center'>
        <div className='mr-auto w-50 text-truncate'>{props.reminder.city}</div>
        <div className='text-truncate'>clima</div>
      </div>
      <div className='d-flex w-100 align-items-center'>
        <div className='mr-auto'>{props.reminder.time}</div>
        <OptionButton onClick={openModal}>
          <i className='fas fa-edit text-info pr-1' />
        </OptionButton>
        <OptionButton
          onClick={() => {
            dispatch({ type: 'REMOVE_REMINDER', id: props.reminder.id })
          }}>
          <i className='fas fa-times text-danger' />
        </OptionButton>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'>
        <ReminderForm currentDayReminder={props.date} />
      </Modal>
    </ReminderWrapper>
  )
}

export default Reminder
