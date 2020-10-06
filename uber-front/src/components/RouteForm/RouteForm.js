import React, { useState, useContext, useEffect } from 'react'; 
import './RouteForm.css';
import { motion } from "framer-motion"
import { DevicePositionContext } from '../../contexts/DevicePositionContext';
import {MapObjectContext} from '../../contexts/MapObjectContext';
import Axios from 'axios';
import {API_KEY} from '../../contexts/DevicePositionContext';

export default function RouteForm(props){

    const {currentDevicePositionInformation} = useContext(DevicePositionContext);
    const {setPickUpMarker, setDropOffMarker, setMapCenter, dropoffMarker} = useContext(MapObjectContext);
    const [pickupAddress, setPickupAddress] = useState("")
    const [dropoffAddress, setDropoffAddress] = useState("")

    useEffect(() => {
        //Setting address in form 
        if(currentDevicePositionInformation){
            setPickupAddress(currentDevicePositionInformation.formatted_address)
            //WARNING : LONG, LAT because of REACT-MAPGL
            setPickUpMarker({
                coords: [currentDevicePositionInformation.long, currentDevicePositionInformation.lat], 
                data: {
                    formatted_address : pickupAddress
                }
            })
            setMapCenter([currentDevicePositionInformation.long, currentDevicePositionInformation.lat])    
        }
    }, [currentDevicePositionInformation])

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
    
    //return coordinates and formatted address
    const getCoordinatesByAddress = async(address) => {
        
        const encodedAddress = urlEncode(dropoffAddress);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`
        Axios.get(url)
        .then((response) => {
            console.log(response.data)
            const formatted_address = response.data.results[0].formatted_address
            const coords = response.data.results[0].geometry.location
            setDropOffMarker({
                coords: [coords.lng, coords.lat], 
                data: {
                    formatted_address: formatted_address
                }
            })
            setMapCenter([coords.lng, coords.lat])
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleFormSubmit = () => {
        if (pickupAddress && dropoffAddress){
            //FIX IF PICK UP DIDNT CHANGE

            //convert address to coords and store in in the mapobject context
            getCoordinatesByAddress(dropoffAddress);
        }
        //Make sure it's not empty 
        //send data to map context 
        //alert (FOR NOW) !
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