import welcomeImage from "../../images/logo.png";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Load() {
    const [loading, setLoading] = useState(<></>);
    // let loading;
    async function startLoad() {
        await fetch("/api/set/execute/load")
            .then((response) => response.json())
            .then((data) => { 
                setLoading(<Navigate to="/loading" state={{remainingTime: 20000}} />)
                console.log(data); 
            })
    }

    
    return (
        <div>
            {
                loading
            }
            <img className="logo" src={welcomeImage} alt="Wilkommen" />
            <h1>Herzlich willkommen!</h1>
            <button onClick={() => { startLoad() }}>initialisieren</button>
            <p>Stellen Sie dazu sicher, dass sich unter dem Ausguss ein Gefäss befindet!</p>
        </div>
    )
}

export default Load;