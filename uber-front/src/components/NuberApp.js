import React, {useEffect, useContext} from 'react';
import { DevicePositionContext } from '../contexts/DevicePositionContext';
import RiderRequest from './RideRequest/RideRequest';
export default function NuberApp(props){


    const {getCurrentDevicePositionInformation, hasFetchedPosition} = useContext(DevicePositionContext)

    useEffect(() => {
        const fetchPosition = async () => await getCurrentDevicePositionInformation()
        fetchPosition();
    }, [hasFetchedPosition])

    return(
        <>
    
            <RiderRequest />
        </>
    )
}