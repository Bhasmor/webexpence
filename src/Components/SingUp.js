import React from 'react'

export default function SingUp() {
  return (
    <div className='access'>
      <h1>SingUp</h1>
      <form>
        <label>Email:</label>
        <input type='email' />
        <label>Password:</label>
        <input type='password' />
        <button>SingUp</button>
      </form>
    </div>
  )
}
