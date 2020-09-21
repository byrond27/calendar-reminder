import uuid from 'uuid/v4'

export const calendarReducer = (state, action) => {
  switch (action.type) {
    case 'CHARGE_CURRENT_MONTH':
      return [
        ...state,
        {
          currentMonth: action.currentMonth.date,
        },
      ]

    case 'ADD_REMINDER':
      return [
        ...state,
        {
          id: uuid(),
          name: action.reminder.name,
          time: action.reminder.time,
          city: action.reminder.city,
          color: action.reminder.color,
          date: action.reminder.currentDateReminder,
          weather: '',
        },
      ]

    case 'REMOVE_REMINDER':
      return state.filter((reminder) => reminder.id !== action.id)

    case 'REMOVE_ALL_DAY_REMINDER':
      return state.filter((reminder) => reminder.date !== action.date)

    default:
      return state
  }
}
