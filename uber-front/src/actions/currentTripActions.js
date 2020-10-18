import { START_TRIP_REQUEST, FAIL_TRIP_REQUEST, SUCCESS_TRIP_REQUEST } from './types';
import { webSocket } from "rxjs/webSocket";


const tripRequestStart = () => ({
    type : START_TRIP_REQUEST
})

const tripRequestFail = (error) => ({
    type : FAIL_TRIP_REQUEST, 
    payload: error 
})

const tripRequestSuccess = (tripData) => {
    return {
        type : SUCCESS_TRIP_REQUEST,
        payload: tripData
    }
}

export const sendTripRequest = (userId, pickupAddress, dropoffAddress) => (dispatch) => {
    
    dispatch(tripRequestStart());
    console.log(userId)
    const data = {
        from_user : userId, 
        driver : null, 
        pickup_address : pickupAddress, 
        dropoff_address : dropoffAddress
    }
    const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
    const ws = webSocket(`ws://127.0.0.1:8000/trips/?${access_token}`); 
    ws.subscribe(msg => {
        if(msg.type === "trip.fail"){
            dispatch(tripRequestFail(msg.data))
        } else if(msg.type === "trip.success"){
            dispatch(tripRequestSuccess(msg.data))
        }
    });
    ws.next({
        type: "create.trip", 
        data: data 
    })
}

//Driver 
