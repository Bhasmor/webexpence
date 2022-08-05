import React from 'react'
import { auth } from './Firebase'

export default function Home() {
  return (
    <div className='home-container'>
      <div className='navbar'>
        <ul>
          <h1>Xpenc</h1>
          <li>Home</li>
          <li>Add Income/Expence</li>
          <li>History</li>
          <button onClick={() => auth.signOut()}>SingOut</button>
          <p>Copyright &copy; 2022 Xpenc</p>
        </ul>
      </div>
    </div>
  )
}
