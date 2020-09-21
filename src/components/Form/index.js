import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { ReminderContext } from '../../ReminderContext'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import moment from 'moment'
import styled from 'styled-components'

const FromWrapper = styled(Form)`
  .DayPickerInput {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    input {
      border: 0;
      width: 100%;
    }
  }
`

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

  const setDatePicker = (day) => {
    console.log(moment(day).format('YYYY-MM-DD'))
    setDate(moment(day).format('YYYY-MM-DD'))
  }

  return (
    <FromWrapper onSubmit={handleSubmit}>
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
        <DayPickerInput
          value={date}
          placeholder='YYYY-MM-DD'
          onDayChange={setDatePicker}
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
    </FromWrapper>
  )
}

export default ReminderForm
