import React from 'react';
import './App.css';
import NuberApp from './components/NuberApp';
import DevicePositionProvider from './contexts/DevicePositionContext';


function App() {

  return (
    <div className="App">
      <DevicePositionProvider>
        <NuberApp />
      </DevicePositionProvider>
    </div>
  );
}

export default App;
