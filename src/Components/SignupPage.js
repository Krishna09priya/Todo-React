import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import {FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postSignup, resetMsg } from './redux/signupRedux';
import Notifications from '../utils/notifications';


function SignupPage() {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const {isloading,signupSuccessMessage} = useSelector((states)=> states.signupReducer);
  const [signupCredential, setSignupCredential]= useState({
    username:'',
    email: '',
    password: '',
    confirmPassword:''
  });;
  const [errorMessage, setErrorMessage] = useState('');

  const submit = ()=>{
    if (signupCredential.password !== signupCredential.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setErrorMessage("");
    dispatch(postSignup({
      username:signupCredential.username,
      email:signupCredential.email,
      password:signupCredential.password
    }))
  }
  useEffect(()=>{
    if(signupSuccessMessage){ 
      Notifications(signupSuccessMessage,'success')
      navigate('/login')
    }
    dispatch(resetMsg())
    },[signupSuccessMessage])

  return (
    <div className="signupPage-body">
      <div className="signupPage-container">
        <h3>Signup</h3>

        <div className="signupPage-input-group">
          <FaUser className="signupPage-icon" />
          <input
            type="text"
            className="signupPage-input"
            placeholder="Username"
            onChange={(e) =>
              setSignupCredential({ ...signupCredential, username: e.target.value })
            }
          />
        </div>

        <div className="signupPage-input-group">
          <FaEnvelope className="signupPage-icon" />
          <input
            type="email"
            className="signupPage-input"
            placeholder="Email"
            onChange={(e) =>
              setSignupCredential({ ...signupCredential, email: e.target.value })
            }
          />
        </div>

        <div className="signupPage-input-group">
          <FaLock className="signupPage-icon" />
          <input
            type="password"
            className="signupPage-input"
            placeholder="Password"
            onChange={(e) =>
              setSignupCredential({ ...signupCredential, password: e.target.value })
            }
          />
        </div>

        <div className="signupPage-input-group">
          <FaLock className="signupPage-icon" />
          <input
            type="password"
            className="signupPage-input"
            placeholder="Confirm Password"
            onChange={(e) =>
              setSignupCredential({ ...signupCredential, confirmPassword: e.target.value })
            }
          />
          {errorMessage && (
            <div className="signupPage-error">{errorMessage}</div>
          )}
        </div>

        <button
          type="submit"
          className="signupPage-btn"
          onClick={submit}
        >
          Signup
        </button>

        <p className="signupPage-footer">
          <Link to="/" className="signupPage-link">
            Already have an account?
          </Link>
        </p>
      </div>
    </div>

  );
}

export default SignupPage;
