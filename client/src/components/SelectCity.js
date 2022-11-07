import React, { useState } from "react";
import './SelectCity.css'
// use React router navigation
import { useNavigate } from 'react-router-dom';

function SelectCity(props) {
    const navigate = useNavigate();

    function handleClick(zip) {
        console.log(zip)
        props.sendZip(zip);
    }

    return(
        <div className="bigDiv">
            <h1>We found these ZIP codes for your city</h1>
            <h2>Please select your ZIP code</h2>

             <div className="zipButtons">
            {props.allZips.map(city => 
            <button className="chosenZip" onClick={e => handleClick(city.zip)} type="button">{city.zip}</button>)}
            </div>
        
        </div>
    )
}

export default SelectCity;