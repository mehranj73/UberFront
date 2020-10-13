import React, { useContext, useEffect, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, GeoJSONLayer } from 'react-mapbox-gl';
import {ACCESS_TOKEN} from '../cst';
import './MainMap.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import { DevicePositionContext } from '../../contexts/DevicePositionContext';
import {MapObjectContext} from '../../contexts/MapObjectContext';
import axios from 'axios';
import { getRoute } from '../../actions/mapActions';
import MapModal from '../MapModal/MapModal';
import { MapModalContext } from '../../contexts/MapModalContext';
import { CurrentTripContext } from '../../contexts/CurrentTripContext';


const Map = ReactMapboxGl({
    accessToken: ACCESS_TOKEN
  });
  
export default function MainMap(props){

    const {mapObjectState, dispatchMapObject} = useContext(MapObjectContext);
    const {setMapModalType, setOpenMapModal, openMapModal} = useContext(MapModalContext);
    const {currentTripState, dispatchCurrentTrip} = useContext(CurrentTripContext);
    const {isSubmitted} = currentTripState;
    //extracting from mapObjectState
    const {pickupMarker, dropoffMarker, mapCenter, mapZoom, route, isLoading} = mapObjectState;

    useEffect(() => {
        if(dropoffMarker.coords){
            getRoute(pickupMarker.coords[0], pickupMarker.coords[1], dropoffMarker.coords[0], dropoffMarker.coords[1])(dispatchMapObject);
        }
    }, [dropoffMarker])

    useEffect(() => {
        if(route){
            setMapModalType("route-loaded"); 
            setOpenMapModal(true);
        }
    }, [route])


    useEffect(() => {
        if(isSubmitted){
            setMapModalType("isSubmitted"); 
            setOpenMapModal(true);
        }
    }, [isSubmitted])

    return(
        <div 
            className="MainMap__Container"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >
            {openMapModal && <MapModal />}
            <Map
                style="mapbox://styles/valent1n/ckfuzl9jh3gin19qp5p5s83jl"
                containerStyle={{
                    height: '100vh', 
                    zIndex: openMapModal ? -1 : 10
                }}
                movingMethod="flyTo"
                className="MainMap"
                center={mapCenter ? mapCenter : [0.5375194, 50.8437787]}
            >
                {pickupMarker.coords && (
                    //COORDINATES : [lat, long]
                    <Marker 
                    coordinates={pickupMarker.coords}
                    offsetLeft={-20}
                    offsetTop={40}
                    >
                        <i className="fas fa-map-marker-alt" style={{fontSize: 40, color: "#209b4b"}}></i>
                    </Marker>
                )}
                {dropoffMarker.coords && (
                    //COORDINATES : [lat, long]
                    <Marker 
                    coordinates={dropoffMarker.coords}
                    offsetLeft={-20}
                    offsetTop={40}
                    >
                        <i className="fas fa-home" style={{fontSize: 40, color: "#209b4b"}}></i>
                    </Marker>
                )}

                {route && (
                    <GeoJSONLayer
                        lineLayout={{
                            "line-cap" : "round", 
                            "line-join" : "miter"
                        }}
                        linePaint={{
                            'line-color': '#4790E5',
                            'line-width': 6
                        }}                       
                        data={route}
                    />
                )}
            </Map>
        </div>
    )
}














































