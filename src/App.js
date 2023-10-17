import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Countries from './components/Countries';
import CountriesSingle from './components/CountriesSingle';
import Home from './components/Home';
import Layout from './pages/Layout';

import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './auth/firebase';
import Favourites from './components/Favourites';
import { Col, Spinner } from 'react-bootstrap';

const App = () => {

  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (loading) return
  },[loading])

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login user={user}/>} />
          <Route path="/register" element={<Register user={user}/>} />

          <Route element={<ProtectedRoute user={user}/>}>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:single" element={<CountriesSingle />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
