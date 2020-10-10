import React, {useEffect, useContext} from 'react'; 
import { Frame } from "framer"
import './MapModal.css';
import { MapModalContext } from '../../contexts/MapModalContext';
import { MapContext } from 'react-mapbox-gl';
import { MapObjectContext } from '../../contexts/MapObjectContext';


export default function MapModal(props){

    const {setOpenMapModal, setMapModalType, openMapModal, mapModalType} = useContext(MapModalContext);
    const {mapObjectState} = useContext(MapObjectContext);
    
    //extract from mapobojectstate
    const tripDuration = mapObjectState.tripDuration

    const handleReset = () => {
        setOpenMapModal(false);
        setMapModalType("");
    }

    const convertTripDuration = (tripDuration) => {
        return Math.floor(tripDuration /60)
    }

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
            {mapModalType === "route-loaded" && (
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
                        <div className="MapModal__Button" style={{backgroundColor: "#3277b3", color: "white", borderColor: "#3277b3"}}>
                            confirm
                        </div>
                    </div>
                </div>
            )}
            {mapModalType === "isLoading-map" && (
                <div class="spinner-border text-light" style={{fontSize: "40px"}}role="status">
                    <span class="sr-only" style={{color: "white"}}>Loading...</span>
                </div>
            )}
        </Frame>
    )
}