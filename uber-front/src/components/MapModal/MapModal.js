import React, {useEffect, useContext} from 'react'; 
import { Frame } from "framer"
import './MapModal.css';
import { MapModalContext } from '../../contexts/MapModalContext';
import { MapContext } from 'react-mapbox-gl';
import { MapObjectContext } from '../../contexts/MapObjectContext';
import { CurrentTripContext } from '../../contexts/CurrentTripContext';
import { sendTripRequest } from '../../actions/currentTripActions';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

export default function MapModal(props){

    const {setOpenMapModal, setMapModalType, openMapModal, mapModalType} = useContext(MapModalContext);
    const {mapObjectState} = useContext(MapObjectContext);
    const {pickupMarker, dropoffMarker} = mapObjectState;
    const {currentTripState, dispatchCurrentTrip} = useContext(CurrentTripContext);
    const isLoadingTrip = currentTripState.isLoading;
    const {authenticationState} = useContext(AuthenticationContext);
    const {user_id} = authenticationState;
    //extract from mapobojectstate
    const tripDuration = mapObjectState.tripDuration

    const handleReset = () => {
        setOpenMapModal(false);
        setMapModalType("");
    }

    const convertTripDuration = (tripDuration) => {
        return Math.floor(tripDuration /60)
    }

    const submitTripRequest = () => {
        const pickupAddress = pickupMarker.data.formatted_address; 
        const dropoffAddress = dropoffMarker.data.formatted_address;
        sendTripRequest(user_id, pickupAddress, dropoffAddress)(dispatchCurrentTrip);
    }

    const handleClose = () => {
        setOpenMapModal(false);
        setMapModalType("");
    }

    useEffect(()=>{
    }, [isLoadingTrip, mapModalType])


    if(mapModalType === "route-loaded"){
        return(
            <Frame
                className="MapModal justify-content-center d-flex"
                width={500}
                height={340}
                borderRadius={10}
                initial={{opacity: 0}}
                backgroundColor={"#FFF"}
                transition={{ease: "linear"}}
                animate={{opacity: 1}}
            >            
                {isLoadingTrip ? (
                    <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                ): (
                    <div className="d-flex MapModal__container">
                    <i class="fas fa-route MapModal__Icon mb-4"></i>
                    <div className="MapModal__title mb-3">
                        Accept the trip to confirm your request
                    </div> 

                    <div className="MapModal__infos mb-3">
                        <div className="d-flex flex-column">
                            <div className="MapModal__infos__row mb-2 d-flex flex-direction-row">
                                <i class="far fa-dot-circle mr-3 MapModal__infos__icon" style={{color: "#7c81ff"}}></i>
                                <div className="MapModal__infos__title">{mapObjectState.pickupMarker.data.formatted_address}</div>
                            </div>
                            <div className="MapModal__infos__row d-flex mb-2 flex-direction-row">
                                <i class="fas fa-map-marker-alt mr-3 MapModal__infos__icon" style={{color: "#2371da", fontSize: "22px"}}></i>
                                <div className="MapModal__infos__title">{mapObjectState.dropoffMarker.data.formatted_address}</div>
                            </div>
                            <div className="MapModal__infos__row d-flex flex-direction-row">
                                <i class="far fa-clock mr-3 MapModal__infos__icon" style={{color: "#03a9f4", fontSize: "20px"}}></i>
                                <div className="MapModal__infos__title">{convertTripDuration(tripDuration)} minutes</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-direction-row justify-content-around"style={{width: "100%"}}>
                        <div 
                            className="MapModal__Button" 
                            style={{borderColor: "#3277b3", color: "#3277b3"}}
                            onClick={handleReset}
                        >
                            back
                        </div>
                        <div 
                            className="MapModal__Button" 
                            style={{backgroundColor: "#3277b3", color: "white", borderColor: "#3277b3"}}
                            onClick={submitTripRequest}
                        >
                            confirm
                        </div>
                    </div>
                </div>
                )}
                
            </Frame>
        )
    } else if(mapModalType === "isLoading-map"){
        return(
            <Frame
                className="MapModal justify-content-center d-flex"
                width={500}
                height={340}
                borderRadius={10}
                initial={{opacity: 0}}
                backgroundColor={"#FFF"}
                transition={{ease: "linear"}}
                animate={{opacity: 1}}
            > 
                <div class="spinner-border text-light" style={{fontSize: "40px"}}role="status">
                    <span class="sr-only" style={{color: "white"}}>Loading...</span>
                </div>
            </Frame>
        )
    } else if(mapModalType === "isSubmitted"){
        return(
            <Frame
                className="MapModal justify-content-center d-flex"
                width={500}
                height={340}
                borderRadius={10}
                initial={{opacity: 0}}
                backgroundColor={"#FFF"}
                transition={{ease: "linear"}}
                animate={{opacity: 1}}
            > 
                <div className="MapModal__submited_trip d-flex flex-column justify-content-center align-items-center">
                    <i class="fas fa-check-circle mb-3" style={{fontSize: '80px', color: "#209b4b"}}></i>
                    <div className="MapModal__title mb-3">
                        Someone is going to pick you up !   
                    </div> 
                    <div 
                        className="MapModal__Button" 
                        style={{backgroundColor: "#209b4b", color: "white", borderColor: "#209b4b"}}
                        onClick={handleClose}
                    >
                        okay
                    </div>
                </div>
            </Frame>            
        )
    }
    
    else {
        return(<></>)
    }
}