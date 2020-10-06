import React, { useState, createContext, useEffect } from 'react'; 
import axios from 'axios';


export const DevicePositionContext = createContext();

export const API_KEY = "AIzaSyAcFe2ncL_THzwJ6mho4TwU0865Y32Yihs";


export default function DevicePositionProvider(props){

    //COORDS
    const [currentDevicePositionInformation, setCurrentDevicePositionInformation] = useState({
        long: null, 
        lat: null, 
        formatted_address: ""
    })

    const [hasFetchedPosition, setHasFetchedPosition] = useState(false)

    const getCurrentDevicePosition = () => {
        return new Promise((resolve, reject) => {
            let long, lat;
            navigator.geolocation.getCurrentPosition(function(position) {
                resolve([position.coords.longitude, position.coords.latitude])    
            });
        })
    }

    const getCurrentDevicePositionInformation = async() => {
        const [long, lat] = await getCurrentDevicePosition().then(res => [...res]);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`
        axios.get(url)
        .then((response) => {
            //updating currentDevicePosition
            setCurrentDevicePositionInformation({
                long: long, 
                lat: lat,
                formatted_address: response.data.results[0].formatted_address
            })
            setHasFetchedPosition(true);
        })
        .catch((error) => {
            console.log(error)
            alert("wrong api call address")
        })
    }

    return(
        <DevicePositionContext.Provider
            value={{currentDevicePositionInformation, getCurrentDevicePositionInformation, hasFetchedPosition}}
        >
            {props.children}
        </DevicePositionContext.Provider>
    )
}
