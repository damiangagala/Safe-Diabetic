import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import ItemBox from "./ItemBox";
import SearchProvider from "../contexts/SearchProvider";

function AppLayout() {
  return (
    <>
      <SearchProvider>
        <Banner />
        <main className="flex min-h-[89%] w-full justify-between bg-gradient-to-br from-teal-500 to-teal-900 px-20 py-8">
          <ItemBox />
          <Outlet />
        </main>
      </SearchProvider>
    </>
  );
}

export default AppLayout;
