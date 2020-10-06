import React, { createContext, useState } from 'react'; 



export const MapObjectContext = createContext(); 


export default function MapObjectProvider(props){

    const [mapCenter, setMapCenter] = useState([-0.2416815, 51.5285582]);
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
            value={{pickupMarker, setPickUpMarker, dropoffMarker, setDropOffMarker, mapCenter, setMapCenter}}
        >
            {props.children}
        </MapObjectContext.Provider>
    )
}