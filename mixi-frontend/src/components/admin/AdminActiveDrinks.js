// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import style from "../../css/ActiveDrinks.module.css";
function AdminActiveDrinks() {
    const [activeDrinks, setActiveDrinks] = useState([]);
    const [basedrinks, setBasedrinks] = useState([]);
    useEffect(() => {
        getBasedrinks();
    }, []);
    async function getActiveDrinks() {
        await fetch("/api/get/availabledrinks")
            .then((response) => response.json())
            .then((data) => { setActiveDrinks(data); console.log(data); })
    }
    async function getBasedrinks() {
        await fetch("/api/get/basedrinks")
            .then((response) => response.json())
            .then((data) => { setBasedrinks(data); console.log(data);getActiveDrinks(); })
    }

    async function updateActiveDrinks(id, value) {
        let data = new FormData();
        data.append('basedrinkid', value);
        data.append('id', id);
        await fetch("/api/set/update/availabledrinks_simple", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                getActiveDrinks();
            })
    }

    function handleSubmit(e, id) {
        e.preventDefault();
        console.log("Value: ", e.target[0].value);
        console.log("id: ", id);
        updateActiveDrinks(id, e.target[0].value);
    }
    //let slots = [{ id: 1, name: "1", drinkname: "Coke", capacity: 1500, level: 1200 }, { id: 2, name: "2", drinkname: "Pepsi", capacity: 1000, level: 250 }, { id: 3, name: "3", drinkname: "Sprite", capacity: 1500, level: 960 }];
    return (
        <div>
            <h1>Eingesetze Getränke</h1>
            <div className={style.slotscontainer}>
                {/* {
                    slots.map(
                        (slot) =>
                            <div className={style.slot} key={slot.id}>
                                <h2>Port {slot.name}</h2>
                                <span>{slot.drinkname}</span>
                                <span>{slot.level} ml / {slot.capacity} ml</span>
                                <button>ändern</button>
                                <button>ersetzen</button>
                            </div>
                    )} */}
                {
                    activeDrinks.map(
                        (slot) =>
                            <div className={style.slot} key={slot.id}>
                                <h2>Port {slot.port}</h2>
                                <span>{slot.name}</span>
                                <form onSubmit={(e) => handleSubmit(e, slot.id)}>
                                    <select defaultValue={slot.basedrinkid}>
                                        <option value={0}>kein Getränk eingesetzt</option>
                                        {
                                            basedrinks.map(
                                                (drink) => <option key={drink.id} value={drink.id}>{drink.name}</option>
                                            )
                                        }
                                    </select>
                                    {/* <span><input type="number" name="capacity" value={slot.capacity} /> ml</span> */}
                                    {/* <span>{slot.capacity} ml / {slot.level} ml</span> */}
                                    <button>speichern</button>
                                </form>
                            </div>
                    )
                }
            </div>
        </div>
    )
}
export default AdminActiveDrinks;