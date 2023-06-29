import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
// import LoginForm from '../connexion/loginRESTO'



const LoginFormresto = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/login/", formData, { withCredentials: true })
      .then((response) => {
        console.log("User authenticated successfully.");
      })
      .catch((error) => {
        console.log("An error occurred while authenticating the user:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form1">
      <div>
        </div><br/>
      <span class="span">Se connecter comme restaurateur</span>
  <br/>
      <label>
      
        <input className="input" placeholder="      entrez votre nom d'utilisateur " type="text" name="username" onChange={handleInputChange} />
      </label>
      <label>
       
        <input className="input" placeholder="      entrez votre mot de pass ici" type="password" name="password" onChange={handleInputChange} />
      </label>
      <button type="submit">Se connecter</button>
      <br/>
      <li> 
        <Link to="/connexion/registerResto" className="link">S'enregistrer</Link></li>	
        <li> <Link to="/connexion/resetResto" className="link">reinitialisez votre mot de pass</Link></li>	



    </form>
  );
};
export default LoginFormresto;