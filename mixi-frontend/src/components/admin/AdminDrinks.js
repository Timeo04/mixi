import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useEffect } from "react";
import style from "../../css/AdminTable.module.css";
import AdminDrinksEdit from "./DrinksEdit/AdminDrinksEdit";
import { Outlet } from "react-router-dom";

function AdminDrinks(){
    const [drinks,setDrinks] = useState([]);
    //const [possibleDrinks, setPossibleDrinks] = useState([{ id: 1, name: "Spezi" }, { id: 2, name: "FantaCola" }]);
    // const [showDrinkEdit, setShowDrinkEdit] = useState(false);
    // const [drinkEditAdd, setDrinkEditAdd] = useState(false);
    // const [activeEditDrink, setActiveEditDrink] = useState();
    
    // useEffect(() => {
    //     getDrinks();
    // },[]);

    // async function getDrinks() {
    //     await fetch("/api/get/drinks")
    //         .then((response) => response.json())
    //         .then((data) => { setDrinks(data); console.log(data); })
    // }

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

    // async function deleteDrink(id) {
    //     console.log("Delete Drink:", id);
    //     let data = new FormData();
    //     data.append('id', id);
    //     await fetch('/api/set/delete/drink', {
    //         method: 'POST',
    //         body: data,
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) =>
    //             console.error(error)
    //         )
    //     getDrinks();
    // }

    return (
        <div>
            {/* {
                showDrinkEdit ? <AdminDrinksEdit add={drinkEditAdd} drink={activeEditDrink} isOpen={setShowDrinkEdit} /> : <></>
            } */}
            <h1>Verfügbare Drinks</h1>
            <Outlet />
            {/* <div className={style.table}>
                {
                    drinks.map((drink) =>
                        <div className={style.row} key={drink.id}>
                            <div>{drink.name}</div>
                            <div className={style.icons}>
                                <button onClick={() => {setDrinkEditAdd(false); setActiveEditDrink(drink); setShowDrinkEdit(true);}}><FontAwesomeIcon icon={solid('pen')} /></button>
                                <button onClick={() => deleteDrink(drink.id)}><FontAwesomeIcon icon={solid('trash')} /></button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={style.addbutton}>
                <button onClick={()=>{setDrinkEditAdd(true);setShowDrinkEdit(true);}}><FontAwesomeIcon icon={solid('add')} /></button>
            </div> */}
        </div>
    );
}

export default AdminDrinks;