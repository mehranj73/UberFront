import React, { createContext, useState, useReducer } from 'react'; 
import mapObjectReducer from '../reducers/mapObjectReducer';

export const MapObjectContext = createContext(); 

const initialState = {
    pickupMarker : {
        coords: null, 
        data : null
    }, 
    dropoffMarker : {
        coords: null, 
        data: null
    },
    mapCenter : null, 
    mapZoom : 5, 
    isLoading: false, 
    route: null, 
    error: null 
}


export default function MapObjectProvider(props){

    //Reducer
    const [mapObjectState, dispatchMapObject] = useReducer(mapObjectReducer, initialState); 

    return(
        <MapObjectContext.Provider
            value={{mapObjectState, dispatchMapObject}}
        >
            {props.children}
        </MapObjectContext.Provider>
    )
}