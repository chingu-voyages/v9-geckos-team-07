import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

const fetchUser = jest.fn()

it('renders without crashing', () => {
  const wrapper = shallow(
    <App user={{ name: 'timmy' }} fetchUser={fetchUser} />
  )
  wrapper.unmount()
})
