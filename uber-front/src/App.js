import React from 'react';
import './App.css';
import NuberApp from './components/NuberApp';
import DevicePositionProvider from './contexts/DevicePositionContext';
import MapObjectProvider from './contexts/MapObjectContext';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Authentication/Login';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import Register from './components/Authentication/Register';
import MapModalProvider from './contexts/MapModalContext';
import CurrentTripProvider from './contexts/CurrentTripContext';
import DriverDashbaord from './components/DriverDashboard/DriverDashboard';
import TripsProvider from './contexts/TripsContext';
import DriverRequestModalProvider from './contexts/DriverRequestModalContext';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthenticationProvider>
          <TripsProvider>
            <DevicePositionProvider>
              <CurrentTripProvider>
                <MapObjectProvider>
                  <MapModalProvider>
                    <Switch>
                      <Route exact path="/register">
                        <Register />
                      </Route>
                      <Route exact path="/rider-dashboard">
                        <NuberApp />
                      </Route>   
                      <Route exact path="/driver-dashboard">
                        <DriverRequestModalProvider>
                          <DriverDashbaord />
                        </DriverRequestModalProvider>
                      </Route>
                      <Route exact path="/">
                        <Login />
                      </Route>           
                    </Switch>
                  </MapModalProvider>
                </MapObjectProvider>
              </CurrentTripProvider>
            </DevicePositionProvider>
          </TripsProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
