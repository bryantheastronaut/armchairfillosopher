import React from 'react'
import cookie from 'react-cookie'

const Timeline = (props) => {
  console.log(cookie.load('loggedIn'))
  return (
    <h2>DIS DA TIMELINE</h2>
  )
}

export default Timeline
