import React from 'react'
import { auth } from './Firebase'

export default function SingUp() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then(auth => {
        console.log(auth);
      })
      .catch(error => {
        console.log(error);
      }
      );
  }

  console.log(email, password);
  return (
    <div className='access'>
      <h2>SingUp</h2>
      <form>
        <h1>Xpenc</h1>
        <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleSubmit}>SingUp</button>
      </form>
    </div>
  )
}
