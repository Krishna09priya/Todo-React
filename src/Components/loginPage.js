import 'bootstrap/dist/css/bootstrap.min.css';
import "../Assets/Style Sheets/LoginPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postLogin, resetMsg } from './redux/loginRedux';
import Notifications from '../utils/notifications';

const Login = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const {isLoading, logInSuccessMessage} = useSelector((states)=> states?.loginReducer);
  const [loginCredential, setLoginCredential]= useState({
    email: '',
    password: '',
  });;

  const submit = ()=>{
    dispatch(postLogin({
      email:loginCredential.email,
      password:loginCredential.password
    }))
  }
  useEffect(()=>{
    if(logInSuccessMessage){ 
      Notifications(logInSuccessMessage,'success')
      navigate('/home')
    }
      dispatch(resetMsg())
  },[logInSuccessMessage])
  return (
    <div className="loginPage-body">
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6 col-lg-4">
        <div className="loginPage-container">
          <h3 className="loginPage-title">Login</h3>

          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control loginPage-input"
                placeholder="Email"
                onChange={(e) =>
                  setLoginCredential({
                    ...loginCredential,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                className="form-control loginPage-input"
                placeholder="Password"
                onChange={(e) =>
                  setLoginCredential({
                    ...loginCredential,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn loginPage-btn w-100"
            onClick={submit}
          >
            Login
          </button>

          <div className="loginPage-links">
            <Link to="/signup" className="loginPage-link">New user?</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
