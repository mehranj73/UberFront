import React from 'react';
import './App.css';
import NuberApp from './components/NuberApp';
import DevicePositionProvider from './contexts/DevicePositionContext';
import MapObjectProvider from './contexts/MapObjectContext';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Authentication/Login';
import { AuthenticationProvider } from './contexts/AuthenticationContext';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthenticationProvider>
          <DevicePositionProvider>
            <MapObjectProvider>
              <Switch>
                <Route path="/">
                  <Login />
                </Route>
                <Route path="/rider-dashboard">
                  <NuberApp />
                </Route>              
              </Switch>
            </MapObjectProvider>
          </DevicePositionProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
