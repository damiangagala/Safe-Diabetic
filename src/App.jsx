import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ItemInfo from "./features/itemInfo/ItemInfo";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/" element={<AppLayout />}>
        <Route path=":id" element={<ItemInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
