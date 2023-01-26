import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useEffect } from "react";
import style from "../../css/AdminTable.module.css";
import { useNavigate } from "react-router-dom";

function AdminDrinksAdd() {
    const [name, setName] = useState("");
    const [alcoholic, setAlcoholic] = useState(false);
    const [content, setContent] = useState([{ basedrinkid: null, ratio: null, index: 0 }]);
    const [contentIndex, setContentIndex] = useState(0);
    const [basedrinks, setBasedrinks] = useState([]);
    const navigate = useNavigate();


    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        getBasedrinks();
    }, []);

    async function getBasedrinks() {
        await fetch("/api/get/basedrinks")
            .then((response) => response.json())
            .then((data) => { setBasedrinks(data); forceUpdate(); })
    }

    async function addDrink(e) {
        e.preventDefault();
        let data = new FormData();
        data.append("name", name);
        data.append("alcoholic", alcoholic);
        data.append("content", JSON.stringify(content));
        console.log(data);
        await fetch("/api/set/add/drink", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // do things
                navigate("../");
            })
        // getDrinks();
        console.log("add");
    }

    function addZutat(e) {
        e.preventDefault();
        let content1 = content;
        content1.push({ basedrinkid: null, ratio: null, index: contentIndex + 1 });
        setContent(content1);
        setContentIndex(contentIndex + 1);
        console.log(content1);
    }

    function removeZutat(zutat) {
        let content1 = content;
        content1.splice(content1.indexOf(zutat), 1);
        setContent(content1);
        forceUpdate();
    }

    function handleSelectChange(e, zutat) {
        let content1 = content;
        content1[content1.indexOf(zutat)].basedrinkid = parseInt(e.target.value);
        console.log(content1[content1.indexOf(zutat)]);
    }

    function handlePercentChange(e, zutat) {
        let content1 = content;
        content1[content1.indexOf(zutat)].ratio = parseInt(e.target.value);
        console.log(content1[content1.indexOf(zutat)]);
    }

    return (
        <div className="admin-drinks-edit">
            <h2>hinzufügen</h2>
            <form onSubmit={(e) => addDrink(e)}>
                <label>Name<input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></label>
                <label>Alkoholisch<input type="checkbox" checked={alcoholic} onChange={(e) => setAlcoholic(e.target.checked)}></input></label>
                {
                    content.map((zutat) =>
                        <div key={zutat.index}>
                            <label>Getränk
                                <select onChange={(e) => handleSelectChange(e, zutat)} defaultValue={0}>
                                    <option disabled={true} value={0}>Zutat auswählen...</option>
                                    {
                                        basedrinks.map((drink) => <option key={drink.id} value={drink.id}>{drink.name}</option>)
                                    }
                                </select></label>
                            <label>Verhältnis (%)<input type="number" min="1" max="100" onChange={(e) => handlePercentChange(e, zutat)} /></label>
                            {zutat.basedrinkid} {zutat.ratio}
                            <button onClick={() => removeZutat(zutat)}>löschen</button>
                        </div>
                    )
                }
                <button onClick={(e) => { addZutat(e) }}>Zutat hinzufügen</button>
                <button type="submit">speichern</button>
            </form>
        </div>
    )

    /*async function addDrink(name) {
        let data = new FormData();
        data.append("name",name);
        await fetch("/api/set/add/drink", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // do things
            })
        getDrinks();
        console.log("add");
    }*/

}

export default AdminDrinksAdd;