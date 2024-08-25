import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import ItemBox from "./ItemBox";
import SearchProvider from "../contexts/SearchProvider";

function AppLayout() {
  return (
    <>
      <SearchProvider>
        <Banner />
        <main className="flex min-h-[60%] w-full justify-between px-14 py-8 sm:px-20">
          <ItemBox />
          <Outlet />
        </main>
      </SearchProvider>
    </>
  );
}

export default AppLayout;
