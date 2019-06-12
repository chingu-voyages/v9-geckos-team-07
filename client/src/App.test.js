import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

const fetchUser = jest.fn()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App user={{ name: 'timmy' }} fetchUser={fetchUser} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
