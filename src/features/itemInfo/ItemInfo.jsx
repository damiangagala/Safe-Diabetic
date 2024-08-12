import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { getTrainingItem } from "../../services/trainingAPI";
import { getRecipeItem } from "../../services/recipesAPI";
import { getAuthorId } from "../../services/usersAPI";
import { SearchContext } from "../../contexts/SearchProvider";
import Calendar from "./calendar/Calendar";
import CommentsContainer from "./comments/CommentsContainer";
import Modal from "./Modal";
import RecipeForm from "../recipeForm/RecipeForm";
import TrainingForm from "../trainingForm/TrainingForm";
import ItemInfoMenu from "./ItemInfoMenu";

function ItemInfo() {
  const { id } = useParams();
  const { searchParams } = useContext(SearchContext);
  const activity = searchParams.get("activity");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const itemInfoQuery = useQuery({
    queryKey: ["itemInfoData", id, activity],
    queryFn:
      activity === "training_plan"
        ? () => getTrainingItem(id)
        : () => getRecipeItem(id),
  });

  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });

  const userId = userQuery?.data;
  const itemId = itemInfoQuery.data?.id;

  if (id === undefined) return;
  if (itemInfoQuery.isLoading || userQuery.isLoading) return <p>Loading...</p>;

  return (
    <section className="flex-column relative basis-4/6 flex-wrap ">
      <div className="h-28 basis-2/12 rounded-t-xl bg-emerald-800 text-center  text-zinc-100">
        <h1 className="pt-9 text-3xl font-bold">{itemInfoQuery.data.title}</h1>
        {userQuery.data !== null ? (
          <ItemInfoMenu
            itemId={itemId}
            userId={userId}
            activity={activity}
            navigate={navigate}
            itemInfoQuery={itemInfoQuery}
            userQuery={userQuery}
            open={setIsOpen}
          />
        ) : null}
      </div>
      <div className="flex bg-zinc-50">
        <div className="h-96 basis-[70%] p-4">
          {itemInfoQuery.data.description}
        </div>
        {activity === "recipes" ? (
          <div className="basis-[30%] border-l-2  border-solid  border-[#DFE2DB] p-3">
            <h1 className="mb-4 text-center text-[1.7rem]">Składniki</h1>
            <ul>
              {itemInfoQuery.data.ingredients.map((item) => (
                <li
                  className="mb-2 ml-4 list-disc"
                  key={itemInfoQuery.data.ingredients.indexOf(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="basis-4/12 text-center">
        {activity === "training_plan" ? (
          <Calendar week={itemInfoQuery.data.training_week} />
        ) : (
          <CommentsContainer comment={itemInfoQuery.data} />
        )}
      </div>

      <Modal open={isOpen} onClose={setIsOpen}>
        {activity === "training_plan" ? (
          <TrainingForm
            author={userQuery.data}
            close={setIsOpen}
            data={itemInfoQuery.data}
            isEdit={true}
          />
        ) : (
          <RecipeForm
            author={userQuery.data}
            close={setIsOpen}
            data={itemInfoQuery.data}
            isEdit={true}
          />
        )}
      </Modal>
    </section>
  );
}

export default ItemInfo;
