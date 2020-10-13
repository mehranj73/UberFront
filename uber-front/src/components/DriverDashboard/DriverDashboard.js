import React, {useContext, useEffect} from 'react'; 
import { listenToDriverChannel } from '../../actions/driverTripActions';
import {DriverCurrentTripContext} from '../../contexts/DriverCurrentTripContext';




export default function DriverDashbaord(props){

    const {driverCurrentTripState, dispatchDriverCurrentTrip} = useContext(DriverCurrentTripContext);
    //extract 
    const triprRequested = driverCurrentTripState.isRequested 

    useEffect(() => {
        listenToDriverChannel();
        if(triprRequested){
            alert("READY ! ")
        }
    }, [triprRequested])

    return(
        <div className="DriverDashboard">
            <h1>Driver DashBoard !</h1>
        </div>
    )
}