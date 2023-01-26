import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import style from "../../css/AdminTable.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function AdminBaseDrinksOverview() {
    const [basedrinks, setBasedrinks] = useState([]);

    useEffect(() => {
        getBasedrinks();
    }, []);

    async function getBasedrinks() {
        await fetch("/api/get/basedrinks")
            .then((response) => response.json())
            .then((data) => { setBasedrinks(data); console.log(basedrinks); })
    }

    async function deleteBasedrink(id) {
        let data = new FormData();
        data.append('id', id);
        await fetch('/api/set/delete/basedrink', {
            method: 'POST',
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) =>
                console.error(error)
            )
        getBasedrinks();
    }

    return (
        <div>
            <div className={style.table}>
                {
                    basedrinks.map((basedrink) =>
                        <div className={style.row} key={basedrink.id}>
                            <div>{basedrink.name}</div>
                            <div className={style.icons}>
                                {/* <button onClick={() => openEditModal(basedrink)}><FontAwesomeIcon icon={solid('pen')} /></button> */}
                                <Link to={basedrink.id} state={{name: basedrink.name}}><FontAwesomeIcon icon={solid('pen')} /></Link>
                                <button onClick={() => deleteBasedrink(basedrink.id)}><FontAwesomeIcon icon={solid('trash')} /></button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={style.addbutton}>
                <Link to="add"><FontAwesomeIcon icon={solid('add')} /></Link>
            </div>
        </div>
    )
}
export default AdminBaseDrinksOverview;