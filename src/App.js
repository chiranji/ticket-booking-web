import React, { lazy, useState } from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import { useUserState } from './context/loginContext';

const Dashboard = React.lazy(()=> import('./layout/pages/dashboard'));
const Ticket = React.lazy(()=> import('./layout/pages/ticket'));
const Login = React.lazy(()=> import('./login/login'));


function App() {

  var { isAutheniticate } = useUserState();
  return (
   <>
    <BrowserRouter>
      <Routes>
          <Route
          exact
          path='/login'
          name='Login page'
          element={isAutheniticate ? <Dashboard /> : <Login />}
          />

         <Route
         path='*'
         name='Dashboard'
         element={isAutheniticate ? <Dashboard /> : <Navigate replace to='Login' /> } 
         />
         <Route exact path='/ticket' name='booking' element={<Ticket />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;