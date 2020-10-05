import React, { useEffect, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import {ACCESS_TOKEN} from '../cst';

//Css
import './MainMap.css';
import 'mapbox-gl/dist/mapbox-gl.css'



const Map = ReactMapboxGl({
    accessToken: ACCESS_TOKEN
  });
  
export default function MainMap(props){

    const [centerCoord, setCenterCoord] = useState([0,0])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCenterCoord([position.coords.longitude, position.coords.latitude]);
        });    
    })  
    return(
        <>
                <Map
                    style="mapbox://styles/valent1n/ckfuzl9jh3gin19qp5p5s83jl"
                    containerStyle={{
                        height: '100vh'
                    }}
                >
                    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                    </Layer>
                    <Marker 
                        coordinates={[-0.481747846041145, 51.3233379650232]}
                        offsetLeft={-20}
                        offsetTop={40}
                    >
                        <i class="fas fa-map-marker-alt" style={{fontSize: 40, color: "pink"}}></i>
                    </Marker>
                </Map>
        </>
    )
}














































