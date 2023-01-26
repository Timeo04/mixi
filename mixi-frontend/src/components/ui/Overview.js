// import { useContext } from "react";

function Overview(props) {
    console.log(props);
    return (
        <div className="overview" style={{ border: '5px solid black' }}>
            <h3>Übersicht</h3>
            <div className="drink-container">
                {
                    props.possibleDrinks.map((drink) =>
                        <div className="drink" key={drink.id} onClick={() => { props.setActivePossibleDrink(props.possibleDrinks.indexOf(drink)+1); }}>
                            <h2>{drink.name}</h2>
                            <img src=""></img>
                            <button onClick={() => { props.setActivePossibleDrink(props.possibleDrinks.indexOf(drink)+1); }}>auswählen</button>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Overview;