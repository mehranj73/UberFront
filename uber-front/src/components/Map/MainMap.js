import React, { useContext, useEffect, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import {ACCESS_TOKEN} from '../cst';

import './MainMap.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import { DevicePositionContext } from '../../contexts/DevicePositionContext';
import {MapObjectContext} from '../../contexts/MapObjectContext';



const Map = ReactMapboxGl({
    accessToken: ACCESS_TOKEN
  });
  
export default function MainMap(props){

    const {pickupMarker, dropoffMarker} = useContext(MapObjectContext); 

    return(
        <>
                <Map
                    style="mapbox://styles/valent1n/ckfuzl9jh3gin19qp5p5s83jl"
                    containerStyle={{
                        height: '100vh'
                    }}
                    zoom={[7]}
                >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                    </Layer>
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
                            <i className="fas fa-map-marker-alt" style={{fontSize: 40, color: "#209b4b"}}></i>
                        </Marker>
                    )}
                </Map>
        </>
    )
}














































