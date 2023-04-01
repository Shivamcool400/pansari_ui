import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from './auth';
import './login.css';
import  login  from "./assets/login.svg";

const Login = () => {
  let navigate = useNavigate();
  const { user, setUser } = useUserAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }


  const handleLogin = () => {

    if (email === "Bittupansari" && password === "123") {
      setUser(true);
      return navigate("/admin")
    }
    else {
      alert("Invalid credentials! Kindly check username or password")
    }


  };
const redirect = () =>{
  return navigate("/")
}





  return (
    <>
      <div id="logreg-forms">
        <img src={login} className="img-thumbnail" />
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center' }}>Admin Login</h1>
          <br />
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />


          <br />
          <br />
          <p className='text-center'>
            <button className="btn btn-success btn-block" type="button" onClick={handleLogin}><i className="fas fa-sign-in-alt" /> Sign in</button>

          </p>




        </form>
        <figure class="text-center">
<p class="h5">Not admin! Go to user page.</p>
</figure>


        <div class="container text-center">
  <div class="row">
    <div class="col">
    </div>
    <div class="col">
    <button class="btn btn-secondary btn-lg" onClick={redirect}> User</button>
    </div>
    <div class="col">
    </div>
  </div>
</div>
<br/>
<br/>
      </div>

    </>
  );
};



export default Login;