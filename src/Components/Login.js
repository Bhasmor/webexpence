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
      <h2>Login</h2>
      <form>
        <h1>Xpenc</h1>
        <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}
