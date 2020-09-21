import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { ReminderContext } from '../../ReminderContext'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

const ReminderForm = (props) => {
  const { dispatch } = useContext(ReminderContext)
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [city, setCity] = useState('')
  const [color, setColor] = useState('')
  const [date, setDate] = useState(props.currentDayReminder)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (props.editReminder !== undefined) {
      setName(props.editReminder.name)
      setTime(props.editReminder.time)
      setCity(props.editReminder.city)
      setColor(props.editReminder.color)
      setDate(props.editReminder.date)
      setEdit(true)
    }
  }, [props.editReminder])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const weather = await getWeather()
    dispatch({
      type: 'ADD_REMINDER',
      reminder: { name, time, city, weather, color, date },
    })

    setName('')
    setTime('')
    setCity('')
    setColor('')
    setDate('')
  }

  const getWeather = async () => {
    let weatherResponse = await axios
      .get('https://api.openweathermap.org/data/2.5/weather?', {
        params: {
          q: city,
          appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        },
      })
      .then(function (res) {
        return res.data.weather[0].main
      })
      .catch(function (error) {
        console.log(error)
      })
    console.log(weatherResponse)
    return weatherResponse
  }

  const editReminderHandler = async () => {
    const weather = await getWeather()

    dispatch({
      type: 'EDIT_REMINDER',
      reminder: {
        name,
        time,
        city,
        color,
        id: props.editReminder.id,
        date,
        weather,
      },
    })
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
        <Label for='day'>Day</Label>
        <Input
          id='day'
          type='text'
          placeholder='Day'
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
          autoComplete='off'
          required
          disabled={!edit}
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
        {edit ? (
          <Button color='primary' onClick={editReminderHandler}>
            Edit
          </Button>
        ) : (
          <Button color='success'>Save</Button>
        )}
      </FormGroup>
    </Form>
  )
}

export default ReminderForm
