import React, { createContext, useReducer, useEffect } from 'react'
import { calendarReducer } from '../reducers/calendarReducer'
import Modal from 'react-modal'
import ReminderForm from '../components/Form'

export const ReminderContext = createContext()

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

const ReminderContextProvider = (props) => {
  const [reminders, dispatch] = useReducer(calendarReducer, [], () => {
    const localState = localStorage.getItem('reminders')
    return localState ? JSON.parse(localState) : []
  })

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders))
  }, [reminders])

  Modal.setAppElement('#root')
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
  return (
    <ReminderContext.Provider value={{ reminders, dispatch }}>
      {props.children}
      {/* <Modal ></Modal> validate modal and show */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'>
        <ReminderForm currentDayReminder={props.date} />
      </Modal>
    </ReminderContext.Provider>
  )
}

export default ReminderContextProvider
