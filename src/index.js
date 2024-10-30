import React from 'react';
import reactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import { ToastContainer, Zoom } from 'react-toastify';

const store = configureStore();
const root = reactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode >
  <>
    <ToastContainer closeButton transition={Zoom} icon theme='dark' hideProgressBar/>
    <Provider store={store}> 
      <RouterProvider router = {router} />
    </Provider>
    </>
  // </React.StrictMode>
);

reportWebVitals();
