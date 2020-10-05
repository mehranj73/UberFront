import React from 'react';
import './App.css';
import NuberApp from './components/NuberApp';
import DevicePositionProvider from './contexts/DevicePositionContext';
import MapObjectProvider from './contexts/MapObjectContext';


function App() {

  return (
    <div className="App">
      <DevicePositionProvider>
        <MapObjectProvider>
          <NuberApp />
        </MapObjectProvider>
      </DevicePositionProvider>
    </div>
  );
}

export default App;
