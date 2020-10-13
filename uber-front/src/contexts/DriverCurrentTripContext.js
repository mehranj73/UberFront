import React, { useReducer, createContext } from 'react'; 
import driverCurrentTripReducer from '../reducers/driverCurrentTripReducer';


export const DriverCurrentTripContext = createContext();

const init = {  
    isLoading: false, 
    isRequested : false,
    isDriving : false,
    tripRiderUserName : null, 
    tripRiderFirstName : null, 
    tripRiderLastName : null, 
    tripRiderPicture : null, 
    tripPickupAddress : null, 
    tripDropoffAddress : null, 
    tripCurrentStatus : null, 
    error: null
}


export default function DriverCurrentTripProvider(props){

    const [driverCurrentTripState, dispatchDriverCurrentTrip] = useReducer(driverCurrentTripReducer,init)

    return(
        <DriverCurrentTripContext.Provider value={{driverCurrentTripState, dispatchDriverCurrentTrip}}>
            {props.children}
        </DriverCurrentTripContext.Provider>
    )
}