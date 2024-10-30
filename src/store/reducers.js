import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../Components/redux/loginRedux';
import signupReducer from '../Components/redux/signupRedux';
import projectReducer from '../Components/redux/projectRedux';
import projectsReducer from '../Components/redux/projectsRedux'


const rootReducer = combineReducers({
    signupReducer,
    loginReducer,
    projectReducer,
    projectsReducer

});

export default rootReducer;