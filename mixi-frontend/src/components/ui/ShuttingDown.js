import { useEffect } from "react";

function ShuttingDown() {
    async function powerOff(){
        await fetch('/api/set/execute/shutdown')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
    }
    useEffect(()=>{
        powerOff();
    },[])
    return (
        <div className="frontend-container">
            <h2>wird heruntergefahren...</h2>
            <p>Bitte warten Sie, dass das rote Licht erlischt und sich das Display ausschaltet, bevor Sie den Stecker ziehen.</p>
        </div>
    )
}
export default ShuttingDown;