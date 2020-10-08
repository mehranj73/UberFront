import { SUCCESS_GET_USER, START_GET_USER, FAIL_GET_USER } from "./types"; 
import axios from 'axios';


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
        console.log(response)
    })
    .then((error) => {
        console.log(error)
    })

    console.log("wtf ? ")

    //api call 
    //catch error / response => disaptch back 
}