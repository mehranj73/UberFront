import axios from 'axios';
import { START_GET_TRIPS, FAIL_GET_TRIPS, SUCCESS_GET_TRIPS, ADD_TRIP } from "./types";


const getTripsStart = () => ({
    type : START_GET_TRIPS
})

const getTripsFail = (error) => ({
    type : FAIL_GET_TRIPS, 
    payload : error
})

const getTripsSucces = (trips) => ({
    type : SUCCESS_GET_TRIPS, 
    payload : trips
})

export const addTrip = (new_trip) => ({
    type : ADD_TRIP, 
    payload: new_trip
})


export const getTrips = (userId) => (dispatch) => {
    dispatch(getTripsStart());
    const url = 'http://localhost:8000/api/v1/trips/'; 
    const access_token = JSON.parse(window.localStorage.getItem("access_token")).access;
    const headers = {
        'Authorization' : `Bearer ${access_token}`
    }
    const config = {headers : headers}
    axios.get(url, config)
    .then((response) => {
        dispatch(getTripsSucces(response.data))
    })
    .catch((error) => {
        dispatch(getTripsFail(error))
    })
}