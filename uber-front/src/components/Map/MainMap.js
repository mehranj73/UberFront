import React, { useContext, useEffect, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, GeoJSONLayer } from 'react-mapbox-gl';
import {ACCESS_TOKEN} from '../cst';

import './MainMap.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import { DevicePositionContext } from '../../contexts/DevicePositionContext';
import {MapObjectContext} from '../../contexts/MapObjectContext';
import axios from 'axios';


const Map = ReactMapboxGl({
    accessToken: ACCESS_TOKEN
  });
  
export default function MainMap(props){

    const {pickupMarker, dropoffMarker, mapCenter} = useContext(MapObjectContext); 
    const [route, setRoute] = useState(null);


    useEffect(() => {
        console.log(pickupMarker)
        if(pickupMarker.coords && dropoffMarker.coords){
            const startLong = pickupMarker.coords[0]; 
            const startLat = pickupMarker.coords[1]; 
            const endLong = dropoffMarker.coords[0]; 
            const endLat = dropoffMarker.coords[1]; 
            const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${startLong},${startLat};${endLong},${endLat}?geometries=geojson&access_token=${ACCESS_TOKEN}`;
            axios.get(url)
            .then((response) => {
                console.log(response)
                setRoute(response.data.trips[0].geometry)
            })
            .catch((err) => {
                console.log(err.response)
            })
        } 
    }, [dropoffMarker])
    return(
        <>
                <Map
                    style="mapbox://styles/valent1n/ckfuzl9jh3gin19qp5p5s83jl"
                    containerStyle={{
                        height: '100vh'
                    }}
                    zoom={[16]}
                    movingMethod="flyTo"
                    center={mapCenter}
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
                            <i className="fas fa-home" style={{fontSize: 40, color: "#209b4b"}}></i>
                        </Marker>
                    )}

                    {route && (
                        <GeoJSONLayer
                            data={route}
                            lineLayout={{
                                "line-cap" : "round", 
                                "line-join" : "miter"
                            }}
                            linePaint={{
                                'line-color': '#4790E5',
                                'line-width': 12
                            }}                       
                            data={route}
                        />
                    )}
                </Map>
        </>
    )
}














































