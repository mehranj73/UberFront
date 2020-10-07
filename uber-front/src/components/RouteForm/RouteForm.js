import React, { useState, useContext, useEffect } from 'react'; 
import './RouteForm.css';
import { motion } from "framer-motion"
import { DevicePositionContext } from '../../contexts/DevicePositionContext';
import {MapObjectContext} from '../../contexts/MapObjectContext';
import Axios from 'axios';
import {API_KEY} from '../../contexts/DevicePositionContext';
import {getRoute, setMarker} from '../../actions/mapActions';


export default function RouteForm(props){

    const {currentDevicePositionInformation} = useContext(DevicePositionContext);
    const {mapObjectState ,dispatchMapObject} = useContext(MapObjectContext);
    //extracting from mapObjectState 
    const {pickupMarker, dropoffMarker} = mapObjectState;

    const [pickupAddress, setPickupAddress] = useState("")
    const [dropoffAddress, setDropoffAddress] = useState("")

    useEffect(() => {
        //setup address in form
        if(currentDevicePositionInformation.long && currentDevicePositionInformation.lat && currentDevicePositionInformation.formatted_address){
            console.log("WE RECEIVED POSITION ! ")
            console.log(currentDevicePositionInformation)
            //swap coords for Mapbox 
            const coords = [currentDevicePositionInformation.long, currentDevicePositionInformation.lat];
            const data = {formatted_address : currentDevicePositionInformation.formatted_address};
            const markerPositionInfos = {coords, data}
            setMarker(markerPositionInfos, "pickup")(dispatchMapObject);
            setPickupAddress(currentDevicePositionInformation.formatted_address)
        }
    }, [currentDevicePositionInformation.formatted_address, currentDevicePositionInformation.long])

    const handleChange = (e) => {
        if(e.target.name === "pickupAddress"){
            setPickupAddress(e.target.value)
        } else if (e.target.name === "dropoffAddress"){
            setDropoffAddress(e.target.value)
        }
    }

    //utils
    const urlEncode = (address) => {
        for(let i = 0; i < address.length; i++){
            if(address.charAt(i) === " "){
                address = address.substr(0,i) + "+" + address.substr(i+1);
            }
        }
        return address
    }
    
    // return coordinates and formatted address for the dropoff destination
    const getCoordinatesByAddress = async(address) => {
        
        const encodedAddress = urlEncode(dropoffAddress);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`
        Axios.get(url)
        .then((response) => {
            console.log(response.data)
            const formatted_address = response.data.results[0].formatted_address
            const coords = response.data.results[0].geometry.location
            const markerPositionInfos = {coords: [coords.lng, coords.lat], data: {formatted_address: formatted_address}}
            //set up marker
            setMarker(markerPositionInfos, "dropoff")(dispatchMapObject);
            //setDropoffAddress(formatted_address)
            console.log("TRYING TO GET ROUTE ! ")
            // getRoute(pickupMarker.coords[0], pickupMarker.coords[1], dropoffMarker.coords[0], dropoffMarker.coords[1])(dispatchMapObject)
            //set up map center to the new marker
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleFormSubmit = async() => {
        if (pickupAddress && dropoffAddress){
            //convert address to coords and store in in the mapobject context
            //New marker created
            getCoordinatesByAddress(dropoffAddress);
        } else {
            alert("Missing values")
        }
    }

    return(
        <div className="RouteForm">
            <h3 className="mb-4">Route Details</h3>
            
            <div className="RouteForm__form">
                <div className="RouteForm__InputRow d-flex justify-content-center align-items-center mb-3">
                    <motion.div 
                        className="RouteForm__InputContainer flex-row mr-3"
                    >
                        <input 
                            placeholder="address ..."
                            className="RouteForm__Input"
                            value={pickupAddress}
                            name="pickupAddress"
                            onChange={handleChange}
                        ></input>
                        <i className="fas fa-home input__icon"></i>
                    </motion.div>
                    <i 
                        className="fas fa-plus input__plusIcon"
                    ></i>
                </div>

                <div className="RouteForm__InputRow d-flex justify-content-center align-items-center mb-3">
                    <motion.div 
                        className="RouteForm__InputContainer flex-row mr-3"
                    >
                        <input
                            placeholder="address ..." 
                            className="RouteForm__Input"
                            name="dropoffAddress"
                            onChange={handleChange}
                            value={dropoffAddress}
                        ></input>
                        <i className="fas fa-map-marker-alt input__icon"></i>
                    </motion.div>
                    <i 
                        className="fas fa-plus input__plusIcon"
                    ></i>
                </div>

                <div 
                    className="RouteForm__RequestButton"
                    onClick={handleFormSubmit}
                >
                    order now !
                </div>
            </div>
        </div>
    )
}