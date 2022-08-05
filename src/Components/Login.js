import React from 'react'
import { auth } from './Firebase'

export default function Login() {


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        console.log(auth);
      })
      .catch(error => {
        console.log(error);
      }
      );
  }


  return (
    <div className='access'>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)}/>
        <label>Password:</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}
