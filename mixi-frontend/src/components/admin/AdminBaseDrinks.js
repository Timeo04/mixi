// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// import style from "../../css/AdminTable.module.css";
// import { useEffect, useState } from "react";
// import Modal from "react-modal";
import { Outlet } from "react-router-dom";

function AdminBaseDrinks() {
    return (
        <div>
            <h1>Grundzutaten</h1>
            <Outlet />
        </div>
    )
}
export default AdminBaseDrinks;