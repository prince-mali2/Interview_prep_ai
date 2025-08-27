import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './Pages/auth/login';
import SignUp from './Pages/auth/signUp';
import Landing from './Pages/landing';
import Dashboard from './Pages/home/dashboard';
import InterviewPrep from './Pages/interviewprep/interviewprep';


function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep/>}/>
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize: "13px",
          }
        }}
        />
    </div>
  )
}

export default App
