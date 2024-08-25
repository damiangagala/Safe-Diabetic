import { useLocation, useNavigate } from "react-router-dom";
import { BsBarChartFill } from "react-icons/bs";
import { LuClock } from "react-icons/lu";

function Item({ item, author, activity, fav }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const activityItem = item[activity] || item;
  const diff = fav === "false" ? item.difficulty : activityItem.difficulty;

  function handleClick() {
    fav === "true"
      ? navigate(`/${activityItem.id}${search}`)
      : navigate(`/${item.id}${search}`);
  }

  return (
    <div
      onClick={handleClick}
      className="m-1 flex w-64 cursor-pointer items-center justify-between gap-2 border-b-2 border-solid border-zinc-300 p-2 text-black last:border-0 lg:w-full "
    >
      <div className="text-md basis-[70%]">
        <h3 className="font-bold text-teal-900">
          {fav === "false"
            ? item.title.toUpperCase()
            : activityItem.title.toUpperCase()}
        </h3>
        <p className="text-xs">{author.username}</p>
      </div>
      <div className="flex basis-[30%] justify-center  p-1">
        <span>{fav === "false" ? item.time : activityItem.time}</span>
        <span>
          <LuClock size={15} className="ml-[.2rem] mt-[.3rem]" />
        </span>

        <span>
          <BsBarChartFill
            size={16}
            className="ml-6 mt-1"
            color={
              diff === "Trudny"
                ? "#b91c1c"
                : diff === "Łatwy"
                  ? "green"
                  : "#eab308"
            }
          />
        </span>
      </div>
    </div>
  );
}

export default Item;
