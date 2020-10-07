import { ACCESS_TOKEN } from '../components/cst';
import { START_ADD_MAKRER, SUCCESS_ADD_DROPOFF_MARKER, SUCCESS_ADD_PICKUP_MARKER, FAIL_ADD_MARKER, START_ADD_ROUTE, SUCCESS_ADD_ROUTE, FAIL_ADD_ROUTE } from './types';
import axios from 'axios';

const addMArkerStart = () => ({
    type: START_ADD_MAKRER, 
})

//related_input => pickup vs drop off
//markerInfo is ready to use
const addMArkerrSuccess = (markerInfo, related_input) => {
    //add dropoff marker
    if(related_input === "dropoff"){
        return({
                type: SUCCESS_ADD_DROPOFF_MARKER, 
                payload : markerInfo
            })
    } else if(related_input === "pickup"){
        return({
                type: SUCCESS_ADD_PICKUP_MARKER, 
                payload: markerInfo
            })
    }
}

const addMarkerFail = (error) => ({
    type: FAIL_ADD_MARKER, 
    payload: {
        error: error
    }
})

const addRouteStart = () => ({
    type: START_ADD_ROUTE
})

const addRouteSuccess = (route) => ({
    type: SUCCESS_ADD_ROUTE, 
    payload: route
})

const addRouteFail = (error) => ({
    type: FAIL_ADD_ROUTE, 
    payload: error
})

export const getRoute = (startLng, startLat, endLng, endLat) => (dispatch) => {
    dispatch(addRouteStart)
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=${ACCESS_TOKEN}`;
    axios.get(url)
    .then((response) => {
        console.log(response.data.trips[0].geometry)
        dispatch(addRouteSuccess(response.data.trips[0].geometry))
    })
    .catch((err) => {
        dispatch(addRouteFail(err.response))
    })
}

export const setMarker = (markerPositionInfos, related_input) => (dispatch) => {
    //throw start 
    dispatch(addMArkerStart());
    try{
        dispatch(addMArkerrSuccess(markerPositionInfos, related_input));
    }catch(error) {
        dispatch(addMarkerFail(error));
    }
}