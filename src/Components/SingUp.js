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
      <h1>SingUp</h1>
      <form>
        <label>Email:</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)}/>
        <label>Password:</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>SingUp</button>
      </form>
    </div>
  )
}
