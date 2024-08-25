import { useQuery } from "@tanstack/react-query";
import Item from "./Item";
import { getTrainingItemListData } from "../../services/trainingAPI";
import { getRecipesItemListData } from "../../services/recipesAPI";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchProvider";
import { getAuthorId } from "../../services/usersAPI";
import LoadSpinner from "../../ui/LoadSpinner";

function ItemList() {
  const { searchParams } = useContext(SearchContext);
  const activity = searchParams.get("activity");
  const fav = searchParams.get("fav");

  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });

  const authorId = userQuery?.data;

  const itemQuery = useQuery({
    queryKey: ["itemList", fav, activity, authorId],
    queryFn:
      activity === "training_plan"
        ? () => getTrainingItemListData(fav, authorId)
        : () => getRecipesItemListData(fav, authorId),
  });

  if (itemQuery.isLoading || userQuery.isLoading)
    return (
      <div className="flex h-full content-center items-center">
        <LoadSpinner color={"#065f46"} size={"3rem"} thickness={"8px"} />
      </div>
    );

  if (itemQuery.error)
    return (
      <div className=" rounded-b-sm bg-sky-950 p-[0.3rem] text-white">
        <p>{itemQuery.error.message}</p>
      </div>
    );

  return (
    <div className="rounded-b-sm p-[0.3rem] text-white">
      {itemQuery.data.map((info) => (
        <Item
          key={itemQuery.data.indexOf(info)}
          item={info}
          author={info.profiles}
          activity={activity}
          fav={fav}
        />
      ))}
    </div>
  );
}

export default ItemList;
