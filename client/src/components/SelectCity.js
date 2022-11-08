import React, { useState, useEffect } from "react";
import './SelectCity.css'
// use React router navigation
import { useNavigate } from 'react-router-dom';


function SelectCity(props) {
    const navigate = useNavigate();
    const [cityStats, setCityStats] = useState([]);
    
    // const selectedCity = props.selectedCityInput;
    // console.log(selectedCity);

    useEffect(() => {
        getCityStats();
      }, []);

    async function getCityStats() {
        
        try {
            console.log(props.selectedCityInput);
            let response = await fetch(`/enviro_data/city/${props.selectedCityInput}/citystats`);
            if (response.ok) {
              let data = await response.json();
              setCityStats(data);
              console.log("here", data);
            } else {
              console.log(`Server error: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            console.log(`Network error: ${error.message}`);
          }
        }
        

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