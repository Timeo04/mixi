import { useState } from "react";
import { Navigate } from "react-router-dom";

function PreviewActive(props) {
    const [showLoading, setShowLoading] = useState(<></>);
    const [size, setSize] = useState(3);

    let content = props.possibleDrinks[props.activePossibleDrink - 1].content;
    let drinkBasedrinks = content.map((part) => props.baseDrinks.find(obj => { return parseInt(obj.id) === part.basedrinkid; }));
    let drinkBasedrinkNames = drinkBasedrinks.map((drinkBasedrinks) => drinkBasedrinks.name);
    // let showLoading;


    function setLoading(val) {
        val ? console.log("wird portioniert") : console.log("portionieren abgeschlossen");
    }

    function startDrink(drinkid) {
        console.log(props.possibleDrinks[drinkid]);
        console.log("DRINKID: ",drinkid);
        setLoading(true);
        let data = new FormData();
        data.append('drink', drinkid);
        data.append('size', size);
        fetch("/api/set/execute/calculate", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    setTimeout(() => setLoading(false), data.remainingTime + 100);
                }
                setShowLoading(<Navigate to="/loading" replace={true} state={{ baseDrinkNames: drinkBasedrinkNames, drink: props.possibleDrinks[props.activePossibleDrink - 1], remainingTime: data.remainingTime }} />);
                // showLoading = 

            })
    }
    //console.log(drinkBasedrinks);
    // content.map((part)=>{props.baseDrinks.find(obj => {return obj.id==part.basedrinkid;})})
    // content.map((part)=>{drinkBasedrinks.append(props.baseDrinks.find(obj => {return obj.id==part.basedrinkid;}));});
    return (
        <>
            {
                showLoading
            }
            <p>
                <strong>Zutaten: </strong>
                {drinkBasedrinkNames.join(", ")}
            </p>
            <p>
                {/* {
                    props.possibleDrinks[props.activePossibleDrink - 1].alcoholic ? <>enthält Alkohol</> : <>alkoholfrei</>
                } */}
            </p>
            <div className="size">
                <button className={size==1 ? "active" : ""} onClick={() => { setSize(1); }}>Shot</button>
                <button className={size==2 ? "active" : ""} onClick={() => { setSize(2); }}>small</button>
                <button className={size==3 ? "active" : ""} onClick={() => { setSize(3); }}>medium</button>
                <button className={size==4 ? "active" : ""} onClick={() => { setSize(4); }}>big</button>
            </div>
            {/* <button onClick={() => { startDrink(props.activePossibleDrink - 1); }}>Drink!</button> */}
            <button onClick={() => { startDrink(props.possibleDrinks[props.activePossibleDrink - 1].id); }}>Drink!</button>
        </>
    );
}

export default PreviewActive;