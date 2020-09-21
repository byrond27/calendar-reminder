import React, { useContext, useState } from 'react'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
import { SketchPicker } from 'react-color'
import 'rc-time-picker/assets/index.css'
import { ReminderContext } from '../../ReminderContext'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

const ReminderForm = (props) => {
  // const time = props.reminder.time
  //   ? moment(props.reminder.time, 'HH:mm a')
  //   : moment().hour(0).minute(0)

  const { dispatch } = useContext(ReminderContext)
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState('')
  const [color, setColor] = useState('')
  const [currentDateReminder] = useState(props.currentDayReminder)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_REMINDER',
      reminder: { name, time, city, weather, color, currentDateReminder },
    })
    setName('')
    setTime('')
    setCity('')
    setWeather('')
    setColor('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for='name'>Reminder</Label>
        <Input
          id='name'
          type='text'
          placeholder='Reminder'
          max-length='30'
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for='time'>Time</Label>
        <Input
          id='time'
          type='text'
          placeholder='Time'
          max-length='30'
          defaultValue={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for='color'>Color</Label>
        <Input
          id='color'
          type='text'
          placeholder='Color'
          max-length='30'
          defaultValue={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for='city'>City</Label>
        <Input
          id='city'
          type='text'
          placeholder='City'
          max-length='30'
          defaultValue={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormGroup>
      <FormGroup className='text-center'>
        <Button color='danger'>Cancel</Button>
        <Button color='success'>Submit</Button>
      </FormGroup>
    </Form>
  )
}

export default ReminderForm
