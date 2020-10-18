import React, {useContext, useEffect} from 'react'; 
import { webSocket } from 'rxjs/webSocket';
import { getTrips, addTrip } from '../../actions/tripsActions';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { DriverRequestModalContext } from '../../contexts/DriverRequestModalContext';
import { TripsContext } from '../../contexts/TripsContext';
import DriverRequestModal from '../DriverRequestModal/DriverRequestModal';


export default function DriverDashbaord(props){

    const {tripsState, dispatchTrips} = useContext(TripsContext)
    const {authenticationState} = useContext(AuthenticationContext);
    const {isOpen, setIsOpen, setRequestedTrip} = useContext(DriverRequestModalContext);

    //extract auth 
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
                    setRequestedTrip(msg.data)
                    setIsOpen(true)
                }
            }
        )
    }, [])

    return(
        <div className="DriverDashboard">
            <h1>Driver DashBoard !</h1>

            {isOpen && <DriverRequestModal/>}
        </div>
    )
}