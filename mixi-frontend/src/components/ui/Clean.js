import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Clean() {
    const [loading, setLoading] = useState(<></>);

    async function flush() {
        await fetch("/api/set/execute/flush")
            .then((response) => response.json())
            .then((data) => {
                setLoading(<Navigate to="/loading" state={{ remainingTime: 20000 }} />)
                console.log(data);
            })
    }
    async function clean() {
        await fetch("/api/set/execute/clean")
            .then((response) => response.json())
            .then((data) => {
                setLoading(<Navigate to="/loading" state={{ remainingTime: 20000 }} />)
                console.log(data);
            })
    }
    return (
        <div className="frontend-container">
            <Link to="/" className="settings"><FontAwesomeIcon icon={solid('x')} size="2x" /></Link>
            
            {
                loading
            }
            <div className="head">
                <h1>Clean</h1>
            </div>
            <div className="left">
                <h2>Spülen</h2>
                <p>Füllen Sie alle Flaschen mit Wasser, um die Schläuche zu spühlen.</p>
                <p>Stellen Sie sicher, dass sich ein Gefäss unter dem Ausguss befindet.</p>
                {/* <p>Wenn Sie bereit sind, betätigen sie "spülen".</p> */}
                <button onClick={() => { flush(); }}>spülen</button>
            </div>
            <div className="right">
                <h2>Schläuche entleeren</h2>
                <p>Drücken Sie "Schläuche leeren", um die in den Schläuchen enthaltene Flüssigkeit zurück in die Flaschen zu pumpen.</p>
                <p>Stellen Sie sicher, dass sich in jedem Port eine Flasche befindet.</p>
                <button onClick={() => { clean(); }}>Schläuche leeren</button>
            </div>
        </div>
    )
}

export default Clean;