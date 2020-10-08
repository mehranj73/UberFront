import React, { useState, useContext } from 'react'; 
import { userLogIn } from '../../actions/authenticationActions';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import './Login.css';

export default function Login(props){

    const {dispatchAuthentication} = useContext(AuthenticationContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleChange = (e) => {
        if(e.target.name === "username"){
            setUsername(e.target.value);
        } else if (e.target.name === "password"){
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {   
        e.preventDefault(); 
        if(username && password){
            userLogIn(username, password)(dispatchAuthentication);
        }
    }

    return(
        <div className="Login AuthenticationLayout">
            <div className="container d-flex flex-column h-100">
                <div className="d-flex justify-content-start">
                    <i class="fas fa-arrow-left" style={{color: "white"}}></i>
                </div>
                <form 
                    className="d-flex flex-column justify-content-center align-items-center Login__form"
                    onSubmit={handleSubmit}
                >
                    <input 
                        className="authentication__Input mb-3"
                        placeholder="username / email" 
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />

                    <input 
                        className="authentication__Input mb-3"
                        placeholder="password" 
                        name="password"
                        value={password}
                        type="password"
                        onChange={handleChange}
                    />

                    <button
                        className="authentication__Button mb-3"
                        type="submit"
                    >
                        Log in 
                    </button>
                </form>
            </div>
        </div>
    )
}