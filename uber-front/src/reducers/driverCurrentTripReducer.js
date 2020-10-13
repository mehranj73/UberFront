import { FAIL_ACCEPT_TRIP, START_ACCEPT_TRIP, SUCCESS_ACCEPT_TRIP } from "../actions/types";



export default function driverCurrentTripReducer(state, action){
    switch(action.type){
        case START_ACCEPT_TRIP: 
            return {
                ...state, 
                isDriving : false,
                isLoading: true
            }
        case FAIL_ACCEPT_TRIP: 
            return {
                isLoading: true, 
                isDriving: false,
                error: action.payload
            }
        case SUCCESS_ACCEPT_TRIP: 
            return {
                isLoading: false, 
                isLoading: false, 
                isDriving : true,
                tripRiderUserName : action.payload, 
                tripRiderFirstName : action.payload, 
                tripRiderLastName : action.payload, 
                tripRiderPicture : action.payload, 
                tripPickupAddress : action.payload, 
                tripDropoffAddress : action.payload, 
                tripCurrentStatus : action.payload, 
                error: null
            }
    }
}