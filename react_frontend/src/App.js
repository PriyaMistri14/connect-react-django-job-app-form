// import logo from './logo.svg';
import './App.css';

import InputForm from './components/input-form/input-form.component';

import React , {useState, useEffect} from 'react';

import axios from 'axios';

import axiosIntance from './axiosApi';

import LoginForm from './components/login-from/login-form.component';
import RegistrationForm from './components/registration-form/registration-form.component';
import ShowCandidate from './components/show-candidate/show-candidate.component';


import { Routes, Route, Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';






function App() {
  // const [candidate, setCandidate] = useState([])

  // useEffect(()=>{

  //   (async ()=>{
  //     try{
  //       // const candidates = await axios.get("http://127.0.0.1:8000/job/candidate/")
  //       // axios.defaults.headers['Authorization'] ='JWT ' + localStorage.getItem("access_token")
  //       const candidates = await axiosIntance.get("http://127.0.0.1:8000/job/candidate/")
  //       // axios.defaults.headers['Authorization'] ='JWT ' + localStorage.getItem("access_token")

  //       console.log(candidates)
  //       setCandidate(candidates)

  //     }catch(error){
  //       console.log(error)

  //     }
  //   }
      
  //   )()

  // },[])

  const navigate = useNavigate()


  const logoutHandler = async()=>{
    const res = await axiosIntance.post("http://127.0.0.1:8000/job/logout/",{
      refresh_token : localStorage.getItem("refresh_token")
    })
console.log("res after blacklisting::", res)

    console.log("Before log out value of token ::", axiosIntance.defaults.headers["Authorization"])
    axiosIntance.defaults.headers["Authorization"] = null
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/login/")


  }




  return (
    <div className="App">
      <nav className='nav-bar'>
        {
          axiosIntance.defaults.headers['Authorization'] === null ? 
          
           <Link to="/login/" className='nav-link'>Login</Link>
           :  <a  onClick={logoutHandler}>Log Out</a>
           



        }
        {/* <Link to="/login/" className='nav-link'>Login</Link> */}
        <Link to="/register/" className='nav-link' >Register</Link>
        <Link to="/input-form/" className='nav-link' >Input Form</Link>
        <Link to="/show-candidate/" className='nav-link' >Show Candidate</Link>

      </nav>

      <Routes >
        <Route path="/login/" element={<LoginForm />} />
        <Route path="/register/" element={<RegistrationForm />} />
        <Route path="/input-form/" element={<InputForm />} />
        <Route path="/show-candidate/" element={<ShowCandidate />} />
      </Routes>



    </div>
  );
}

export default App;
