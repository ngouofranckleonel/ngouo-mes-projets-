import React from 'react';
import axios from 'axios';
import LoginForm from '../connexion/loginCLIENT';

const Login = () => {
  const data = {
    username: 'nom_utilisateur',
    password: 'mot_de_passe'
  };

  axios.post('http://127.0.0.1:8000/login/', data, {
    headers: {
      'Content-Type': 'application/json',
      // 'X-CSRFToken': csrftoken
    }
  })
  .then(response => {
    console.log(response.data);
  });

  return (
    <header>
      <div className="art">
        {/* < RegistrationForm/> */}
      </div>

      <div className="art">
        <LoginForm/>
      </div>
      <div>
        {/* <PasswordResetForm/>  */}
      </div>
    </header>
  )
}

export default Login;
