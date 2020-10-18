import React, {useContext} from 'react'; 
import {Frame} from 'framer'
import { TripsContext } from '../../contexts/TripsContext';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { webSocket } from 'rxjs/webSocket';
import { DriverRequestModalContext } from '../../contexts/DriverRequestModalContext';




export default function DriverRequestModal(props){

    const {tripState} = useContext(TripsContext);
    const {authenticationState} = useContext(AuthenticationContext);
    const {requestedTrip} = useContext(DriverRequestModalContext);


    const acceptTrip = () => {
        const driver_id = authenticationState.user_id;
        const updated_trip = {...requestedTrip, driver: driver_id}
        const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
        const ws = webSocket(`ws://127.0.0.1:8000/trips/?${access_token}`); 
        console.log(updated_trip)
        ws.subscribe(); 
        ws.next({
            type : "accept.trip", 
            data : updated_trip
        })
    }

    return(
        <div className="DriverRequestModal">
            <Frame
                height={200}
                width={500}
                className="d-flex direction-column justify-content-center"
                radius={30}
            >
                <div className="DriverRequestModal__rider-infos">
                    <div className="DriverRequestModal__rider-name">
                        Jean Valentin
                    </div>
                </div>
                <div 
                    className="DriverRequestModal__accept-request"
                    onClick={acceptTrip}
                >
                    Accept
                </div>
            </Frame>
        </div>
    )
}