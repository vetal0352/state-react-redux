import { createStore } from 'redux'

const vals = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

let initialState = {
    data: vals,
    intervalId: undefined
}

/* modelling actions */
const START_SHIFT = "START_SHIFT"
const START_SHIFT_AUTOMATIC = "START_SHIFT_AUTOMATIC"
const STOP_SHIFT = "STOP_SHIFT"

export const acStart = () => ({type: START_SHIFT})
export const acStartAutomatic = (intervalId) => ({type: START_SHIFT_AUTOMATIC, intervalId})
export const acStop = () => ({type: STOP_SHIFT})
/* ************** */


const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_SHIFT:
          let newData = [...state.data]
          newData.unshift(newData.pop())
          return Object.assign({}, state, { data: newData })
        case START_SHIFT_AUTOMATIC:
          return Object.assign({}, state, { intervalId: action.intervalId })
        case STOP_SHIFT:
          clearInterval(state.intervalId);
          return Object.assign({}, state, { intervalId: undefined })
        default:
          return state
    }
}

let store = createStore(mainReducer)

export default store

