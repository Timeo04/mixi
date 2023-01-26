// import './css/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AdminArea from './components/admin/AdminArea';
import AdminIndex from './components/admin/AdminIndex';
import AdminBaseDrinks from './components/admin/AdminBaseDrinks';
import AdminActiveDrinks from './components/admin/AdminActiveDrinks';
import AdminDrinks from "./components/admin/AdminDrinks";
import AdminParty from "./components/admin/AdminParty";
import MainUI from "./components/ui/MainUI";
import Loading from "./components/ui/Loading";
import Load from "./components/ui/Load";
import Menu from "./components/ui/Menu";
import Clean from "./components/ui/Clean";
import LaunchSettings from "./components/ui/LaunchSettings";
import ShuttingDown from "./components/ui/ShuttingDown";
import Led from "./components/ui/Led";
import AdminBaseDrinksOverview from "./components/admin/AdminBaseDrinksOverview";
import AdminBaseDrinksAdd from "./components/admin/AdminBaseDrinksAdd";
import AdminBaseDrinksEdit from "./components/admin/AdminBaseDrinksEdit";
import AdminDrinksOverview from "./components/admin/AdminDrinksOverview";
import AdminDrinksAdd from "./components/admin/AdminDrinksAdd";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<MainUI />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/load" element={<Load />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/clean" element={<Clean />} />
          <Route path="/launchsettings" element={<LaunchSettings />} />
          <Route path="/shuttingdown" element={<ShuttingDown />} />
          <Route path="/led" element={<Led />} />
          <Route path="/admin" element={<AdminArea />}>
            <Route path="drinks" element={<AdminDrinks />} >
              <Route index element={<AdminDrinksOverview />} />
              <Route path="add" element={<AdminDrinksAdd />} />
            </Route>
            <Route path="activedrinks" element={<AdminActiveDrinks />} />
            <Route path="basedrinks" element={<AdminBaseDrinks />}>
              <Route index element={<AdminBaseDrinksOverview />} />
              <Route path="add" element={<AdminBaseDrinksAdd />} />
              <Route path=":basedrinkid" element={<AdminBaseDrinksEdit />} />
            </Route>
            <Route path="party" element={<AdminParty />} />
            <Route index path="*" element={<AdminIndex />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
