import React, {useEffect} from 'react'; 
import { listenToChannel } from '../../actions/driverTripActions';




export default function DriverDashbaord(props){


    useEffect(() => {
        listenToChannel();
    })

    return(
        <div className="DriverDashboard">
            <h1>Driver DashBoard !</h1>
        </div>
    )
}