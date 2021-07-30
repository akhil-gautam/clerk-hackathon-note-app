import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import CustomizedSignIn from './pages/SignIn';
import CustomizedSignUp from './pages/SignUp';

import './App.css';
import Notes from './pages/Notes';
import { CLERK_FRONTEND_API, API_URL } from './constants';

const App = () => {
  const [active, setActive] = useState(localStorage.getItem('active'));

  async function touchNote() {
    const response = await axios.post(`${API_URL}/notes`, {
      session: window.Clerk.session.id,
    });
    localStorage.setItem('active', response.data.note.id);
    setActive(response.data.note.id);
  }

  return (
    <Router>
      <ClerkProvider frontendApi={CLERK_FRONTEND_API}>
        <Switch>
          <PrivateRoute exact path='/'>
            <Home setActive={setActive} />
          </PrivateRoute>
          <Route exact path='/sign-in'>
            <CustomizedSignIn />
          </Route>
          <Route exact path='/sign-up'>
            <CustomizedSignUp />
          </Route>
          <PrivateRoute path='/notes'>
            <Notes
              setActive={setActive}
              touchNote={touchNote}
              active={active}
            />
          </PrivateRoute>
        </Switch>
        <ToastContainer />
      </ClerkProvider>
    </Router>
  );
};

function PrivateRoute(props) {
  // If the route matches but the user is not signed in, redirect to /sign-in
  return (
    <>
      <SignedIn>
        <Route {...props} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;
