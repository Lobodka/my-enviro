import React, { useState, useEffect } from "react";
import './SelectCity.css'
// use React router navigation
import { useNavigate } from 'react-router-dom';


function SelectCity(props) {
    const navigate = useNavigate();
    const [cityStats, setCityStats] = useState([]);
    
    const selectedCity = props.selectedCityInput;
    // console.log(selectedCity);

    useEffect(() => {
        getCityStats();
      }, []);

    async function getCityStats() {
        try {
            // console.log(props.selectedCityInput);
            let response = await fetch(`/enviro_data/city/${selectedCity}/citystats`);
            if (response.ok) {
              let data = await response.json();
              setCityStats(data);
            //   console.log("here", data);
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

            <div className="cityStats">
                {cityStats.map(stat => 
                <p>
                   <span className="MinLevels">
                   Minimum air pollution: {stat.min_air} <br/>
                   Minimum amount of hazardous waste cleanup sites: {stat.min_haz_cleanups} <br/>
                   Minimum likelihood of lead paint in houses: {stat.min_lead_paint} % <br/>
                   Minimum water contamination level: {stat.min_water} % <br/>
                   </span>
                  
                   <span className="MaxLevels">
                   Maximum air pollution: {stat.max_air} <br/>
                   Maximum amount of hazardous waste cleanup sites: {stat.max_haz_cleanups} <br/>
                   Maximum likelihood of lead paint in houses: {stat.max_lead_paint} % <br/>
                   Maximum water contamination level: {stat.max_water} % <br/>
                   </span>

                   <span className="AvgLevels">
                   Average air pollution: {stat.avg_air} <br/>
                   Average amount of hazardous waste cleanup sites: {stat.avg_haz_cleanups} <br/>
                   Average likelihood of lead paint in houses: {stat.avg_lead_paint} % <br/>
                   Average water contamination level: {stat.avg_water} % 
                   </span>
                </p>
                )}
            </div>
           
           
            <h2>Please select your ZIP code</h2>
             <div className="zipButtons">
            {props.allZips.map(city => 
            <button className="chosenZip" onClick={e => handleClick(city.zip)} type="button">{city.zip}</button>)}
            </div>
        
        </div>
    )
}

export default SelectCity;