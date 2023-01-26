import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

function AdminArea() {
    return (
        <>
            <AdminHeader />
            <main className="admin-content">
                {/* <h2>Admin</h2>
                <p>Hier können die Drinks verwaltet werden.</p> */}
                <Outlet />
            </main>
        </>
    );
}
export default AdminArea;