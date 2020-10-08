import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';




export default function Register(props){

    const [currentFormStep, setCurrentFormStep] = useState(0);

    return(
        <div className="Register AuthenticationLayout">
            <div className="container d-flex justify-content-start">
                <i class="fas fa-arrow-left" style={{color: "white"}}></i>
            </div>

            {currentFormStep === 0 && 
                <form 
                className="d-flex flex-column justify-content-center align-items-center Login__form"
                >        
                    <input 
                        className="authentication__Input mb-3"
                        placeholder="first name" 
                        name="first_name"
                    />
                    <input 
                        className="authentication__Input mb-3"
                        placeholder="last name" 
                        name="last_name"
                    />
                    <input 
                        className="authentication__Input mb-3"
                        placeholder="email" 
                        name="email"
                    />
                    <input 
                        className="authentication__Input mb-3"
                        placeholder="password" 
                        name="password1"
                    />
                    <input 
                        className="authentication__Input mb-3"
                        placeholder="password2" 
                        name="password2"
                    />

                    <div style={{color: "white"}}>You already have an account ? <Link to="/">Log In</Link></div>

                </form>
            }
        </div>
    )
}