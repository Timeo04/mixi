import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Menu() {

    return (
        <div className="frontend-container">
            <Link to="/" className="settings"><FontAwesomeIcon icon={solid('x')} size="2x" /></Link>
            <div className="menu-navigation">
                <div>
                    <Link to="/shuttingdown">ausschalten</Link>
                    <Link to="/clean">reinigen</Link>
                </div>
                <div>
                    <Link to="/led">LEDs</Link>
                    <Link to="/launchsettings">Einstellungen</Link>
                </div>
            </div>
        </div>
    )
}
export default Menu;