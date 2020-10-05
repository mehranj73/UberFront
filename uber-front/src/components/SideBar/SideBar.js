import React from 'react'; 
import RouteForm from '../RouteForm/RouteForm';
import './SideBar.css';

export default function SideBar(props){

    return(
        <div className="SideBar col-md-3 pt-4 pb-4">
            <div className="SideBar__logo">
                Nuber
            </div>
            {/* Form goes here  */}
            <RouteForm />
        </div>
    )
}