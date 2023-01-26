import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { NavLink } from "react-router-dom";


function AdminHeader() {
    // function showNav(e){
    //     e.preventDefault();
    //     console.log("hallo");
    // }
    return (
        <header className="admin-header">
            <h1>Mixiii</h1>
            {/* <button onClick={showNav} className="burger"><FontAwesomeIcon icon={solid('bars')}/></button> */}
            <nav>
                <NavLink to="." end><FontAwesomeIcon icon={solid('home')} />Übersicht</NavLink>
                <NavLink to="drinks"><FontAwesomeIcon icon={solid('martini-glass-citrus')} />Drinks</NavLink>
                <NavLink to="activedrinks"><FontAwesomeIcon icon={solid('chart-simple')} />Eingesetze Getränke</NavLink>
                <NavLink to="basedrinks"><FontAwesomeIcon icon={solid('bottle-droplet')} />Grundzutaten</NavLink>
                <NavLink to="party"><FontAwesomeIcon icon={solid('lightbulb')} />Party</NavLink>
            </nav>
        </header>
    )
}
export default AdminHeader;