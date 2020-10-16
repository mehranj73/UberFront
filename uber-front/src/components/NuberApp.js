import React, {useEffect, useContext} from 'react';
import { DevicePositionContext } from '../contexts/DevicePositionContext';
import RiderRequest from './RideRequest/RideRequest';
import {getTrips} from '../actions/tripsActions';
import { TripsContext } from '../contexts/TripsContext';
export default function NuberApp(props){


    const {getCurrentDevicePositionInformation, hasFetchedPosition} = useContext(DevicePositionContext)
    const {tripsState, dispatchTrips} = useContext(TripsContext)

    useEffect(() => {
        const fetchTrips = async () => await getTrips()(dispatchTrips);
        const fetchPosition = async () => await getCurrentDevicePositionInformation()
        fetchPosition();
        fetchTrips();
    }, [hasFetchedPosition])

    console.log("checking trips load")
    console.log(tripsState.trips)

    return(
        <>
            <RiderRequest />
        </>
    )
}