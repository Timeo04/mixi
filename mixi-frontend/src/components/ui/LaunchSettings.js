import qrcode from "../../images/qrcode.svg";
import qrcode2 from "../../images/qrcode2.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
function LaunchSettings() {
    const [first, setFirst] = useState(true);
    return (
        <div>
            <div className="header">
                <Link to="/" className="settings"><FontAwesomeIcon icon={solid('x')} size="2x" /></Link>
                <h1>Erweiterte Einstellungen öffnen</h1>
            </div>

            {first ? <div>
                <img className="qrcode" src={qrcode} alt="Drinkmixer WLAN" />
                <p>Verbinden Sie sich mit dem "Mixi"-WLAN durch das Scannen des QR-Codes.<br />
                    <em><small>oder verwenden Sie dazu das Passwort "mixi4ever"</small></em></p>
            </div> : <div>
                <img className="qrcode" src={qrcode2} alt="http://192.168.0.1/admin" />
                <p>Öffnen Sie die Einstellungsseite durch das Scannen des QR-Codes.<br />
                <em><small>oder öffnen Sie <strong>http://192.168.0.1/admin</strong> in Ihrem Internetbrowser</small></em></p>
            </div>}

            {first ? <button onClick={() => setFirst(false)}>weiter</button> : <button onClick={() => setFirst(true)}>zurück</button>}


        </div>
    )
}

export default LaunchSettings;