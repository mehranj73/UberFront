import React, {useEffect, useContext} from 'react';
import { DevicePositionContext } from '../contexts/DevicePositionContext';
import RiderRequest from './RideRequest/RideRequest';
import {getTrips} from '../actions/tripsActions';
import { TripsContext } from '../contexts/TripsContext';
import { webSocket } from 'rxjs/webSocket';
import { CurrentTripContext } from '../contexts/CurrentTripContext';
export default function NuberApp(props){


    const {getCurrentDevicePositionInformation, hasFetchedPosition} = useContext(DevicePositionContext)
    const {tripsState, dispatchTrips} = useContext(TripsContext)
    const {currentTripState} = useContext(CurrentTripContext)


    useEffect(() => {
        // const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
        // const ws = webSocket(`ws://127.0.0.1:8000/trips/?${access_token}`);      
        // console.log(ws)
        // ws.subscribe(
        //     msg => {
        //         console.log("WE RECEIVED THIS !")
        //         console.log(msg)
        //         if(msg.data.id === currentTripState.tripId && msg.data.status === "ACCEPTED"){
        //             alert("ACCEPT ! ")
        //     }
        // })  
        const fetchTrips = async () => await getTrips()(dispatchTrips);
        const fetchPosition = async () => await getCurrentDevicePositionInformation()
        fetchPosition();
        fetchTrips();

    }, [])

    console.log("checking trips load")
    console.log(tripsState.trips)

    return(
        <>
            <RiderRequest />
        </>
    )
}