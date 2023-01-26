import { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Overview from "./Overview";
import Preview from "./Preview";
import styles from "../../css/frontend.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function MainUI() {
    const [possibleDrinks, setPossibleDrinks] = useState([]);
    const [baseDrinks, setBaseDrinks] = useState([]);

    const [activePossibleDrink, setActivePossibleDrink] = useState(null);
    const ActivePossibleDrinksContext = createContext(activePossibleDrink);

    useEffect(
        () => {
            // console.log("hallo");
            getPossibleDrinks();
            getBaseDrinks();
        }
        , []);

    async function getPossibleDrinks() {
        await fetch('/api/get/possibledrinks')
            .then((response) => response.json())
            .then((data) => {
                setPossibleDrinks(data);
                console.log(data);
            })
        // console.log(possibleDrinks);
    }

    async function getBaseDrinks() {
        await fetch('/api/get/basedrinks')
            .then((response) => response.json())
            .then((data) => {
                setBaseDrinks(data);
                console.log(data);
            })
        // console.log(possibleDrinks);
    }


    return (
        // <ActivePossibleDrinksContext.Provider value={activePossibleDrink}>
        <div className="frontend-container">
            <div className="left">
                <Link to="/menu" className="settings"><FontAwesomeIcon icon={solid('gear')} size="2x" /></Link>
                <Preview activePossibleDrink={activePossibleDrink} setActivePossibleDrink={setActivePossibleDrink} possibleDrinks={possibleDrinks} baseDrinks={baseDrinks} />
            </div>
            <div className="right">
                <Overview activePossibleDrink={activePossibleDrink} setActivePossibleDrink={setActivePossibleDrink} possibleDrinks={possibleDrinks} />
            </div>
        </div>
        // </ActivePossibleDrinksContext.Provider>
    )
}
export default MainUI;