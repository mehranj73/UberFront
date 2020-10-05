import React, { createContext, useState } from 'react'; 



export const MapObjectContext = createContext(); 


export default function MapObjectProvider(props){

    const [pickupMarker, setPickUpMarker] = useState({
        coords: [], 
        data: {}
    }); 

    const [dropoffMarker, setDropOffMarker] = useState({
        coords: [], 
        data: {}
    });

    return(
        <MapObjectContext.Provider
            value={{pickupMarker, setPickUpMarker, dropoffMarker, setDropOffMarker}}
        >
            {props.children}
        </MapObjectContext.Provider>
    )
}