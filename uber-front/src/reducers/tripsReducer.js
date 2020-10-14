import { FAIL_GET_TRIPS, START_GET_TRIPS, SUCCESS_GET_TRIPS } from "../actions/types";



export default function tripsReducer(state, action){
    console.log("action type")
    console.log(action.type);
    switch(action.type){
        case START_GET_TRIPS: 
            return {
                ...state, 
                isLoading : true, 
            }
        case FAIL_GET_TRIPS: 
            return {
                isLoading : false, 
                trips : [], 
                error : action.payload
            }
        case SUCCESS_GET_TRIPS: 
            return {
                isLoading : false, 
                trips : action.payload, 
                error : null
            }
    }
}