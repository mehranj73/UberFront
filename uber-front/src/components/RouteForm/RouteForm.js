import React, { useState, useContext, useEffect } from 'react'; 
import './RouteForm.css';
import { motion } from "framer-motion"
import { DevicePositionContext } from '../../contexts/DevicePositionContext';
import {MapObjectContext} from '../../contexts/MapObjectContext';


export default function RouteForm(props){

    const {currentDevicePositionInformation} = useContext(DevicePositionContext);
    const {setPickUpMarker} = useContext(MapObjectContext);
    const [pickupAddress, setPickupAddress] = useState("")
    const [dropoffAddress, setDropoffAddress] = useState("")

    useEffect(() => {
        //Setting address in form 
        setPickupAddress(currentDevicePositionInformation.formatted_address)
        //WARNING : LONG, LAT because of REACT-MAPGL
        setPickUpMarker({coords: [currentDevicePositionInformation.long, currentDevicePositionInformation.lat]})
    }, [currentDevicePositionInformation])

    const handleChange = (e) => {
        if(e.target.name === "pickupAddress"){
            setPickupAddress(e.target.value)
        } else if (e.target.name === "dropoffAddress"){
            setDropoffAddress(e.target.value)
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
            </div>
        </div>
    )
}