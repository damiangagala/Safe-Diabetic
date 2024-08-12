import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchProvider";
import { useGetUser } from "../../hooks/useGetUser";
import { FaStar } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeFill } from "react-icons/pi";

function Menu() {
  const small = "basis-6/12 p-[0.3rem] cursor-pointer mx-auto";
  const { menuNavigation, searchParams } = useContext(SearchContext);
  let activity = searchParams.get("activity");
  let fav = searchParams.get("fav");

  fav === "false" ? (fav = false) : (fav = true);

  const { isLoading, data } = useGetUser();

  if (isLoading) return;
  const test = data !== null;

  return (
    <nav className="flex flex-wrap rounded-t-md bg-emerald-800">
      <div
        className="mx-auto basis-full cursor-pointer border-b-2 border-solid border-zinc-300 p-1 "
        onClick={() => {
          data !== null ? menuNavigation(activity, !fav) : null;
        }}
      >
        <FaStar
          size={30}
          className="mx-auto p-1"
          color={test ? "#eab308" : "gray"}
        />
      </div>

      <div
        className={small}
        onClick={() => {
          menuNavigation("recipes", fav);
        }}
      >
        <PiForkKnifeFill size={30} className={small} color="#fafafa" />
      </div>

      <div
        className={`${small} border-l-2 border-solid border-zinc-300`}
        onClick={() => {
          menuNavigation("training_plan", fav);
        }}
      >
        <FaDumbbell size={30} className={small} color="#fafafa" />
      </div>
    </nav>
  );
}

export default Menu;
