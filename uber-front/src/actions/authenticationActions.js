import { SUCCESS_GET_USER, START_GET_USER, FAIL_GET_USER } from "./types"; 
import axios from 'axios';
import jwt_decode from "jwt-decode";


const getUserStart = () => ({
    type: START_GET_USER
});

const getUserSuccess = (payload) => ({
    type: SUCCESS_GET_USER, 
    payload: payload
})

const getUserFail = (error) => ({
    type: FAIL_GET_USER, 
    payload: error
})


export const userLogIn = (username, password) => (dispatch) => {
    //dispatch start 
    dispatch(getUserStart())
    //We are waiting for tokens
    const url = "http://127.0.0.1:8000/api/v1/accounts/api/token/";
    const credentialObj = {username , password}
    axios.post(url, credentialObj)
    .then((response) => {
        //Decode token 
        const tokenPayload = jwt_decode(response.data.access)
        console.log(tokenPayload);
        window.localStorage.setItem("access_token", JSON.stringify({
            access : response.data.access, 
            exp : 1602181918
        }));
        window.localStorage.setItem("refresh_token", JSON.stringify({
            refresh : response.data.refresh
        }));
        dispatch(getUserSuccess(tokenPayload));
    })
    .catch((error) => {
        console.log(error)
        dispatch(getUserFail(error))
    })

    //api call 
    //catch error / response => disaptch back 
}