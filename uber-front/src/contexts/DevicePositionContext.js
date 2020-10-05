import React, { useState, createContext, useEffect } from 'react'; 
import axios from 'axios';


export const DevicePositionContext = createContext();

const API_KEY = "AIzaSyAcFe2ncL_THzwJ6mho4TwU0865Y32Yihs";


export default function DevicePositionProvider(props){

    //COORDS
    const [currentDevicePosition, setCurrentDevicePosition] = useState({longitude: null, latitude: null})
    //ADDRESS
    const [currentDeviceAddress, setCurrentDeviceAddress] = useState("");

    //TO CALL WHEN THE APP STARTS
    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentDevicePosition({
                "longitude" : position.coords.longitude, 
                "latitude" : position.coords.latitude
            })
        });
    }

    const getCurrentAddress = async() => {
        getCurrentPosition();
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentDevicePosition.longitude},${currentDevicePosition.latitude}&key=${API_KEY}`
        await axios.get(url)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <DevicePositionContext.Provider
            value={{currentDeviceAddress, getCurrentAddress, currentDevicePosition, getCurrentAddress}}
        >
            {props.children}
        </DevicePositionContext.Provider>
    )
}
