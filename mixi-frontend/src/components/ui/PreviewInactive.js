import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import touch from '../../images/touch-svgrepo-com.svg';

function PreviewInactive() {
    return (
        <div>
            <h1>Herzlich willkommen!</h1>
            <img className="touch" src={touch} alt="touch" />
            <p>Bitte wählen Sie ein Getränk.</p>
        </div>
    );
}

export default PreviewInactive;