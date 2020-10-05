import React, { useState } from 'react'; 
import './RouteForm.css';
import { motion } from "framer-motion"



export default function RouteForm(props){

    const variants = {
        focused: {
            scale: 1.1, 
        }, 
        unfocused: {
            scale: 1
        }
    }

    return(
        <div className="RouteForm">
            <h3 className="mb-4">Route Details</h3>
            

            <div className="RouteForm__form">
                <motion.div 
                    className="RouteForm__InputContainer flex-row mb-4"
                    variants={variants}
                    animate="focused" 
                    initial="unfocused"
                >
                    <input 
                        placeholder="address ..."
                        className="RouteForm__Input"
                    ></input>
                    <i class="fas fa-home"></i>
                </motion.div>

                <motion.div 
                    className="RouteForm__InputContainer flex-row mb-4"
                    variants={variants}
                    animate="focused" 
                    initial="unfocused"
                >
                     <input
                        placeholder="address ..." 
                        className="RouteForm__Input"
                    ></input>
                    <i class="fas fa-map-marker-alt"></i>
                </motion.div>
            </div>
        </div>
    )
}