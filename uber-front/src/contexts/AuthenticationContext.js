import React, { createContext, useReducer} from 'react'; 
import authenticationReducer from '../reducers/authenticationReducer';


const initialState = {
    isAuthenticated: false,
    username : null, 
    first_name : null, 
    last_name : null, 
    user_id : null, 
    user_group: null, 
    isLoading: false, 
    error: null
}

export const AuthenticationContext = createContext(); 

export const AuthenticationProvider = (props) => {
    
    const [authenticationState, dispatchAuthentication] = useReducer(authenticationReducer, initialState);

    return(
        <AuthenticationContext.Provider value={{authenticationState, dispatchAuthentication}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}
