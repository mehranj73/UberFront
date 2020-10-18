import React, {useContext, useEffect} from 'react'; 
import { webSocket } from 'rxjs/webSocket';
import { getTrips, addTrip } from '../../actions/tripsActions';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { TripsContext } from '../../contexts/TripsContext';


export default function DriverDashbaord(props){

    const {tripsState, dispatchTrips} = useContext(TripsContext)
    const {authenticationState} = useContext(AuthenticationContext);
    //extract auth 
    console.log(tripsState)
    const {user_id} = authenticationState;

    useEffect(() => {
        //fetch driver trips
        const fetchTrips = async () => await getTrips()(dispatchTrips);
        fetchTrips();
        
        //Listening to the ws 
        const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
        const ws = webSocket(`ws://127.0.0.1:8000/trips/?${access_token}`);     
        ws.subscribe(
            msg => {
                console.log(msg)
                //Add request trip to the trip list
                if(msg.data.driver === null && msg.data.status === "REQUESTED"){
                    dispatchTrips(addTrip(msg.data));
                }
            }
        )
    }, [])


    const acceptTrip = () => {
        const trip = tripsState.trips.filter((trip) => trip.id === 102)[0];
        const updated_trip = {...trip, driver : user_id}
        const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
        const ws = webSocket(`ws://127.0.0.1:8000/trips/?${access_token}`);    
        ws.subscribe();
        //dispatch start join trip  
        try {
            ws.next({
                type : "accept.trip", 
                data : updated_trip
            })
            //dispatch join trip success
        } catch(e){
            //dispatch join trip fail 
        }
    }

    return(
        <div className="DriverDashboard">
            <h1>Driver DashBoard !</h1>
            <button onClick={acceptTrip}>Accept trip</button>
        </div>
    )
}