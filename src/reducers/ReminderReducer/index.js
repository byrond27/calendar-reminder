import uuid from 'uuid/v4'

export const reminderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REMINDER':
      return [
        ...state,
        {
          id: uuid(),
          name: action.reminder.name,
          time: action.reminder.time,
          city: action.reminder.city,
          color: action.reminder.color,
          date: action.reminder.date,
          weather: action.reminder.weather,
        },
      ]

    case 'REMOVE_REMINDER':
      return state.filter((reminder) => reminder.id !== action.id)

    case 'REMOVE_ALL_DAY_REMINDER':
      return state.filter((reminder) => reminder.date !== action.date)

    case 'EDIT_REMINDER':
      var newState = state.map(function (reminder) {
        if (reminder.id === action.reminder.id) {
          return {
            id: reminder.id,
            name: action.reminder.name,
            time: action.reminder.time,
            city: action.reminder.city,
            color: action.reminder.color,
            date: action.reminder.date,
            weather: action.reminder.weather,
          }
        } else {
          return reminder
        }
      })
      return newState

    default:
      return state
  }
}
