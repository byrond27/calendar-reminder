import React, { useContext, useState } from 'react'

import { ReminderContext } from '../../ReminderContext'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

const ReminderForm = (props) => {
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
          defaultValue={name}
          maxLength='30'
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for='time'>Time</Label>
        <Input
          id='time'
          type='text'
          placeholder='Time'
          defaultValue={time}
          onChange={(e) => setTime(e.target.value)}
          autoComplete='off'
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for='city'>City</Label>
        <Input
          id='city'
          type='text'
          placeholder='City'
          defaultValue={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for='color'>Color</Label>
        <Input
          id='color'
          type='text'
          placeholder='Color'
          defaultValue={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup className='text-right'>
        <Button color='success'>Save</Button>
      </FormGroup>
    </Form>
  )
}

export default ReminderForm
