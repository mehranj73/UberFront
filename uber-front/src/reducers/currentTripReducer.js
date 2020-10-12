import { FAIL_TRIP_REQUEST, START_TRIP_REQUEST, SUCCESS_TRIP_REQUEST } from "../actions/types";



// isLoading: false, 
// tripSatus: null, 
// tripError: null, 
// tripFromUser: null, 
// tripDriver: null, 
// tripPickUpAddress: null, 
// tripDropoffAddress: null

export default function currentTripReducer(state, action){
    console.log("Action Type"); 
    console.log(action);

    switch(action.type){
        case START_TRIP_REQUEST: 
            return {
                ...state, 
                isLoading: true
            }
        case FAIL_TRIP_REQUEST: 
            return {
                ...state, 
                isLoading: true, 
                error: action.payload
            }
        case SUCCESS_TRIP_REQUEST: 
            return {
                ...state, 
                isLoading: false,
                tripStatus: action.payload.status, 
                tripFromUser: action.payload.from_user, 
                tripDriver: action.payload.driver, 
                tripPickUpAddress: action.payload.pickup_address, 
                tripDropoffAddress: action.payload.dropoff_address, 
                tripId: action.payload.id,
                isSubmitted: true
            }
    }
}