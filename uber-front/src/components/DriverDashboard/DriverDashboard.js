import React, {useContext, useEffect} from 'react'; 
import { webSocket } from 'rxjs/webSocket';
import { getTrips, addTrip } from '../../actions/tripsActions';
import { TripsContext } from '../../contexts/TripsContext';


export default function DriverDashbaord(props){

    const {tripsState, dispatchTrips} = useContext(TripsContext)

    useEffect(() => {
        //fetch driver trips
        const fetchTrips = async () => await getTrips()(dispatchTrips);
        fetchTrips();
        //Listening to the ws 
        const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
        const ws = webSocket(`ws://127.0.0.1:8000/trips/?${access_token}`);     
        ws.subscribe(
            msg => {
                console.log("LOOK")
                console.log(msg)
                if(msg.data.driver === null && msg.data.status === "REQUESTED"){
                    dispatchTrips(addTrip(msg.data));
                    //we assume it's a trip request
                    //start telling you are updating 
                    //ws.next accept.trips
                }
            }
        )
    }, [])

    console.log("CHECKING THE TRIPS")
    console.log(tripsState.trips)

    return(
        <div className="DriverDashboard">
            <h1>Driver DashBoard !</h1>
            <button>Accept trip</button>
        </div>
    )
}