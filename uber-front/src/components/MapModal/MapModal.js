import React from 'react'; 
import { Frame } from "framer"
import './MapModal.css';


export default function MapModal(props){


    return(
        <Frame
            className="MapModal justify-content-center"
            width={500}
            height={300}
            borderRadius={10}
            initial={{opacity: 0}}
            backgroundColor={"#FFF"}
            transition={{ease: "linear"}}
            animate={{opacity: 1}}
        >
            {props.content} 
            <div class="spinner-border text-light" style={{fontSize: "40px"}}role="status">
                <span class="sr-only" style={{color: "white"}}>Loading...</span>
            </div>
        </Frame>
    )
}