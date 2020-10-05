import React from 'react';
import './App.css';
import RiderRequest from './components/RideRequest/RideRequest';
import DevicePositionProvider from './contexts/DevicePositionContext';



function App() {
  return (
    <div className="App">
      <DevicePositionProvider>
        <RiderRequest />
      </DevicePositionProvider>
    </div>
  );
}

export default App;
