import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function CalcView(props) {
    const navigate = useNavigate();

     

    return(
      <div>
        <h1>Here you'll see the minimun, maximum and mean values for the city you selected</h1>
      </div>
    )
}

export default CalcView;