import React, {useState, createContext} from 'react'; 


export const MapModalContext = createContext();


export default function MapModalProvider(props){

    const [mapModalType, setMapModalType] = useState("route-loaded")
    const [openMapModal, setOpenMapModal] = useState(false);

    return(
        <MapModalContext.Provider value={{mapModalType, setMapModalType, openMapModal, setOpenMapModal}}>
            {props.children}
        </MapModalContext.Provider>
    )
}
