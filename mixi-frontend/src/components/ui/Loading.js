import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
function Loading() {
    const [quote, setQuote] = useState();
    const [remainingTime, setRemainingTime] = useState(10000);
    const { state } = useLocation();
    // const [navigateBack, setNavigateBack] = useState(false);

    let navigateBack;

    if (remainingTime > 0) {
        navigateBack = <></>
        setTimeout(() => { setRemainingTime(remainingTime - 1000) }, 1000);
    } else {
        navigateBack = <Navigate to="/" replace={true} />
    }


    useEffect(() => {
        console.log(state);
        let quotes = ["First you take a drink, then the drink takes a drink, then the drink takes you. - F. Scott Fitzgerald"];
        setRemainingTime(state.remainingTime);
        setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, []);

    return (
        <div className="frontend-container">
            {/* {navigateBack ? <Navigate to="/" replace={true} />:<></>} */}
            {navigateBack}
            <div className="left">

                {/* {navigateBack ? <p>Hallooo</p> : <></>} */}
                <div className="top">
                    <p className="quote">{quote}</p>
                </div>
                <div>
                    <p><strong>Verbleibende Zeit: </strong>{
                        Math.round(remainingTime / 1000)
                    } s</p>
                </div>
            </div>
            {state.drink ?
            <div className="right">
                <h1>{state.drink.name}</h1>
                <p><strong>Zutaten: </strong>{state.baseDrinkNames.join(", ")}</p>
            </div>
:<></>}
        </div>)
}

export default Loading;