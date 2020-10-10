import { FAIL_ADD_MARKER, FAIL_ADD_ROUTE, START_ADD_MAKRER, START_ADD_ROUTE, SUCCESS_ADD_DROPOFF_MARKER, SUCCESS_ADD_PICKUP_MARKER, SUCCESS_ADD_ROUTE } from "../actions/types";

// const initialState = {
//     pickupMarker : {
//         coords: [], 
//         data
//     }, 
//     dropoffMarker : {
//         coords: [], 
//         data
//     },
//     mapCenter : [], 
//     mapZoom : 16, 
//     isLoading: false, 
//     isLoadingRoute: false,
//     route: []
// }


export default function mapObjectReducer(state, action){
    console.log("TYPE", action.type)
    switch(action.type){
        case START_ADD_MAKRER: 
            return {
                ...state, 
                isLoading: true, 
                mapZoom: 5
            }
        case FAIL_ADD_MARKER: 
            return {
                ...state, 
                isLoading: false,
                error: action.payload, 
                mapZoom: 6
            }
        case SUCCESS_ADD_PICKUP_MARKER: 
            return {
                ...state, 
                pickupMarker: action.payload, 
                mapCenter: action.payload.coords,
                isLoading: false, 
                error: null, 
                mapZoom: 20
            }
        case SUCCESS_ADD_DROPOFF_MARKER: 
            return {            
                ...state, 
                dropoffMarker: action.payload, 
                mapCenter: action.payload.coords,
                isLoading: false, 
                error: null, 
                mapZoom: 20
            }
        case START_ADD_ROUTE:
            return {
                ...state, 
                isLoading: true
            }
        case SUCCESS_ADD_ROUTE: 
            return {
                ...state, 
                isLoading: false, 
                route: action.payload.route, 
                tripDuration : action.payload.duration
            }
        case FAIL_ADD_ROUTE: 
            return {
                ...state, 
                isLoading: false, 
                error: action.payload, 
                tripDuration: null
            }
        default: 
            return state 
    }
}