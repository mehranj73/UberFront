import React, {createContext, useState} from "react"; 


export const DriverRequestModalContext = createContext(); 


export default function DriverRequestModalProvider(props){

    const [isOpen, setIsOpen] = useState(false); 
    const [requestedTrip, setRequestedTrip] = useState({});
    
    return(
        <DriverRequestModalContext.Provider
            value={{isOpen, setIsOpen, requestedTrip, setRequestedTrip}}
        >
            {props.children}
        </DriverRequestModalContext.Provider>
    )
}