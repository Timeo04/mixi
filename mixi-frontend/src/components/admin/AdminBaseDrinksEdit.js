import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
function AdminBaseDrinksEdit() {
    const {basedrinkid} = useParams();
    console.log("DrinkID: ",basedrinkid);
    const navigate = useNavigate();
    const location = useLocation();
    const {name} = location.state;
    const [inputValue, setInputValue] = useState(name);
    

    function handleSubmit(e) {
        e.preventDefault();
        editBasedrink(basedrinkid, inputValue);
    }


    async function editBasedrink(id, name) {
        let data = new FormData();
        data.append('id', id);
        data.append('name', name);
        await fetch('/api/set/update/basedrink', {
            method: 'POST',
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate("../");
            })
            .catch((error) => {
                console.error(error);
                navigate("../");
            })
    }

    return (
        <div>
            <h2>bearbeiten</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Zutat" value={inputValue || ''} onChange={(e) => setInputValue(e.target.value)} />
                <input type="submit" value="speichern" />
            </form>
        </div>
    )
}
export default AdminBaseDrinksEdit;