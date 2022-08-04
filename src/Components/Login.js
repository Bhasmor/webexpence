import React from 'react'

export default function Login() {
  return (
    <div className='access'>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type='email' />
        <label>Password:</label>
        <input type='password' />
        <button>Login</button>
      </form>
    </div>
  )
}
