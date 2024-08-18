import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import ItemBox from "./ItemBox";
import SearchProvider from "../contexts/SearchProvider";

function AppLayout() {
  return (
    <>
      <SearchProvider>
        <Banner />
        <main className="flex  w-full justify-between px-20 py-8">
          <ItemBox />
          <Outlet />
        </main>
      </SearchProvider>
    </>
  );
}

export default AppLayout;
