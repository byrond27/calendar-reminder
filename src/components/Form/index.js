import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { ReminderContext } from '../../contexts/ReminderContext'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import styled from 'styled-components'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import TimePicker from 'rc-time-picker'
import ColorPicker from 'rc-color-picker'
import 'react-day-picker/lib/style.css'
import 'rc-time-picker/assets/index.css'
import 'rc-color-picker/assets/index.css'

const FromWrapper = styled(Form)`
  .DayPickerInput,
  .rc-time-picker {
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
      color: black;
      font-size: 15px;
      padding-left: 0;
    }
    .rc-time-picker-clear {
      top: 7px;
    }
  }
`

const ReminderForm = (props) => {
  const { dispatch } = useContext(ReminderContext)
  const [name, setName] = useState('')
  const [time, setTime] = useState(moment().hour(0).minute(0).format('HH:mm'))
  const [city, setCity] = useState('')
  const [color, setColor] = useState('#b3a2a2')
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
    props.closeModalClick()
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
        return res.data.weather[0].description
      })
      .catch(function (error) {
        console.log(error)
        return 'No info'
      })
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
    props.closeModalClick()
  }

  const setDatePicker = (day) => {
    setDate(moment(day).format('YYYY-MM-DD'))
  }

  const onChangeTime = (time) => {
    setTime(time.format('HH:mm'))
  }

  const timePicker = props.editReminder
    ? moment(props.editReminder.time, 'HH:mm')
    : moment().hour(0).minute(0)

  const handleSetColor = (colorPiker) => {
    setColor(colorPiker.color)
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
        <TimePicker
          defaultValue={timePicker}
          format='HH:mm'
          use24Hours
          inputReadOnly
          showSecond={false}
          onChange={onChangeTime}
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
      <FormGroup className='d-flex align-items-center'>
        <Label for='color' className='mr-auto'>
          Color
        </Label>
        <ColorPicker
          className='color-picker'
          animation='slide-up'
          color={color}
          placement='bottomLeft'
          onChange={handleSetColor}
        />
      </FormGroup>
      <FormGroup className='text-right'>
        <Button color='danger' className='mr-2' onClick={props.closeModalClick}>
          Cancel
        </Button>
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
