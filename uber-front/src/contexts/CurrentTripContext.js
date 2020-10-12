import React, { createContext, useReducer } from 'react'; 
import currentTripReducer from '../reducers/currentTripReducer';

export const CurrentTripContext = createContext();

const initialState = {
    isLoading: false, 
    tripStatus: null, 
    tripError: null, 
    tripFromUser: null, 
    tripDriver: null, 
    tripPickUpAddress: null, 
    tripDropoffAddress: null, 
    isSubmitted: false
}

export default function CurrentTripProvider(props){

    const [currentTripState, dispatchCurrentTrip] = useReducer(currentTripReducer, initialState);
    
    return(
        <CurrentTripContext.Provider value={{currentTripState, dispatchCurrentTrip}}>
            {props.children}
        </CurrentTripContext.Provider>
    )
}