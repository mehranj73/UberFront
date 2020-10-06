import React, { createContext, useState } from 'react'; 



export const MapObjectContext = createContext(); 


export default function MapObjectProvider(props){

    const [pickupMarker, setPickUpMarker] = useState({
        coords: null, 
        data: {
            formatted_address: ""
        }
    }); 

    const [dropoffMarker, setDropOffMarker] = useState({
        coords: null, 
        data: {
            formatted_address: ""
        }
    });

    return(
        <MapObjectContext.Provider
            value={{pickupMarker, setPickUpMarker, dropoffMarker, setDropOffMarker}}
        >
            {props.children}
        </MapObjectContext.Provider>
    )
}