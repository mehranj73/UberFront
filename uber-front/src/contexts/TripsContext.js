import React, { createContext, useReducer } from 'react'; 
import tripsReducer from '../reducers/tripsReducer';


export const TripsContext = createContext(); 

const initialState = {
    isLoading : false, 
    trips : [], 
    error : false
}

export default function TripsProvider(props){

    const [tripsState, dispatchTrips] = useReducer(tripsReducer, initialState);

    return(
        <TripsContext.Provider value={{tripsState, dispatchTrips}}>
            {props.children}
        </TripsContext.Provider>
    )
}