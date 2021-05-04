import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { acStartAutomatic, acStart, acStop } from './store';

const getDataValues = state => state.data
const getIntervalId = state => state.intervalId

const Chart1 = (props) => {
  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={props.values}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
    {!props.isShifted && <button onClick={props.start}>Shift 1 step</button>}
    {!props.isShifted && <button onClick={props.startAutomatic}>Shift automatic</button>}
    {props.isShifted && <button onClick={props.stop}>Stop</button>}
  </div>
  )
}

const mapStateToProps = state => ({
  values: getDataValues(state),
  isShifted: getIntervalId(state)
})

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(acStart()),
  startAutomatic: () => {
    let intervalId = setInterval(() => dispatch(acStart()), 1000)
    dispatch(acStartAutomatic(intervalId))
  },
  stop: () => dispatch(acStop())
})

const ChartConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart1)

export default ChartConnected
