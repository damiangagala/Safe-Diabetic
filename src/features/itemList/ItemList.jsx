import { useQuery } from "@tanstack/react-query";
import Item from "./Item";
import { getTrainingItemListData } from "../../services/trainingAPI";
import { getRecipesItemListData } from "../../services/recipesAPI";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchProvider";
import { getAuthorId } from "../../services/usersAPI";

function ItemList() {
  const { searchParams } = useContext(SearchContext);
  const activity = searchParams.get("activity");
  const fav = searchParams.get("fav");

  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });

  // JAK MASZ LISTĘ Z LIKAMI TO NIE WYŚWIETLA JESZCE TWOICH TRENINGÓW TYLKO TE POLUBIONE
  // JAK MASZ LISTĘ Z LIKAMI TO NIE WYŚWIETLA JESZCE TWOICH TRENINGÓW TYLKO TE POLUBIONE
  // JAK MASZ LISTĘ Z LIKAMI TO NIE WYŚWIETLA JESZCE TWOICH TRENINGÓW TYLKO TE POLUBIONE
  // JAK MASZ LISTĘ Z LIKAMI TO NIE WYŚWIETLA JESZCE TWOICH TRENINGÓW TYLKO TE POLUBIONE
  // JAK MASZ LISTĘ Z LIKAMI TO NIE WYŚWIETLA JESZCE TWOICH TRENINGÓW TYLKO TE POLUBIONE
  // JAK MASZ LISTĘ Z LIKAMI TO NIE WYŚWIETLA JESZCE TWOICH TRENINGÓW TYLKO TE POLUBIONE
  // JAK MASZ LISTĘ Z LIKAMI TO NIE WYŚWIETLA JESZCE TWOICH TRENINGÓW TYLKO TE POLUBIONE

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
      <div className="min-h-[50rem] rounded-b-sm  p-[0.3rem] text-white">
        <p>Loading</p>
      </div>
    );

  if (itemQuery.error)
    return (
      <div className="min-h-[40rem] rounded-b-sm bg-sky-950 p-[0.3rem] text-white">
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
