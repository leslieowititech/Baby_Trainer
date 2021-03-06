import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';

import SplashPage from './components/SplashPage/SplashPage';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Charts from './components/Charts/Charts';
import EditPage from './components/LogModals/ForgotandEditModal/EditPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>     
      <Switch>     
        <Route path='/' exact={true} >
          <SplashPage/>
        </Route>       
        <ProtectedRoute path='/home' exact={true}>
          <HomePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/profile' exact={true}>
          <ProfilePage/>
        </ProtectedRoute>
        <ProtectedRoute path='/babies/view/charts' exact={true}>
          <Charts/>
        </ProtectedRoute>
        <ProtectedRoute to='/logs/edit' exact={true}>
            <EditPage/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
