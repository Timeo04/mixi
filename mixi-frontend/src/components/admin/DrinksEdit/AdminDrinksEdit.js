function AdminDrinksEdit(props) {

    console.log(props);

    if (props.add) {

        async function addDrink(name) {
            let data = new FormData();
            data.append("name", name);
            await fetch("/api/set/add/drink", {
                method: "POST",
                body: data
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // do things
                })
            // getDrinks();
            console.log("add");
        }

        return (
            <div className="admin-drinks-edit">
                Add
                <button onClick={()=>props.isOpen(false)}>Close</button>
            </div>
        )
    } else {
        if (props.drink!=null) {
            async function updateDrink(name) {
                let data = new FormData();
                data.append("name", name);
                await fetch("/api/set/add/drink", {
                    method: "POST",
                    body: data
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        // do things
                    })
                // getDrinks();
                console.log("update");
            }

            return (
                <div className="admin-drinks-edit">
                    Update
                    <button onClick={()=>props.isOpen(false)}>Close</button>
                </div>
            )
        }
    }
}

export default AdminDrinksEdit;