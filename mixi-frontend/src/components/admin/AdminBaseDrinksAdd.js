import { useNavigate } from "react-router-dom";
import { useState } from "react";
function AdminBaseDrinksAdd() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        addBasedrink(inputValue);
    }
    
    async function addBasedrink(name) {
        let data = new FormData();
        data.append('basedrink', name);
        await fetch("/api/set/add/basedrink", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate("../");
            })
    }

    return (
        <div>
            <h2>hinzufügen</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Zutat" value={inputValue||''} onChange={(e) => setInputValue(e.target.value)} />
                <input type="submit" value="speichern" />
            </form>
        </div>
    )
}
export default AdminBaseDrinksAdd;