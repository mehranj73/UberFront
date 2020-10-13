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



export const sendTripRequest = (pickupAddress, dropoffAddress) => (dispatch) => {
    
    dispatch(tripRequestStart());
    const data = {
        from_user : null, 
        driver : null, 
        pickupAddress : pickupAddress, 
        dropoffAddress : dropoffAddress
    }
    const access_token = JSON.parse(window.localStorage.getItem("access_token")).access
    console.log(access_token)
    const ws = webSocket(`ws://127.0.0.1:8000/trips/?token=${access_token}`); 
    ws.subscribe(
        msg => {
            console.log("we received : " +JSON.stringify(msg))
            const type = msg.type; 
            console.log(type)
            const data = msg.data
            if(type === ("trip.success")){
                console.log(data)
                dispatch(tripRequestSuccess(data))
            }  
        },
        err => {
            console.log(err)
            return dispatch(tripRequestFail(err))
        },
        () => console.log("complete")
    ); 
    ws.next({
        type: "create.trip", 
        data: data 
    })
}