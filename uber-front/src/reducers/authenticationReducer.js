import { FAIL_GET_USER, START_GET_USER, SUCCESS_GET_USER } from "../actions/types"


export default function authenticationReducer(state, action){
    console.log("Type") 
    console.log(action.type)
    console.log("Payload")
    console.log(action.payload)
    switch(action.type){
        case START_GET_USER: 
            return {
                ...state, 
                isLoading: true, 
                isAuhthenticated: false
            }
        case SUCCESS_GET_USER: 
            return {
                ...state, 
                isAuhthenticated: true,
                isLoading: false, 
                username: action.payload.username, 
                first_name : action.payload.first_name, 
                last_name : action.payload.last_name, 
                user_id : action.payload.user_id, 
                user_group : action.payload.group, 
                erro: null
            }
        case FAIL_GET_USER: 
            return {
                ...state, 
                isLoading: false, 
                error: action.payload, 
                isAuhthenticated: false
            }
        default: 
            return state;
    }
}