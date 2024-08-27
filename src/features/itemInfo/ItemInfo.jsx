import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
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
import LoadSpinner from "../../ui/LoadSpinner";

function ItemInfo() {
  const { id } = useParams();
  const { searchParams } = useContext(SearchContext);
  const activity = searchParams.get("activity");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const editRef = useRef(null);

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
  if (itemInfoQuery.isLoading || userQuery.isLoading)
    return (
      <div className="flex h-[70vh]  w-full content-center items-center lg:basis-4/6">
        <LoadSpinner color={"white"} size={"5rem"} thickness={"8px"} />;
      </div>
    );

  return (
    <section className="relative flex h-[70vh] w-full flex-col  lg:basis-4/6">
      <div className="basis-1/6 rounded-t-xl bg-emerald-800 text-center text-zinc-100">
        <h1 className="pt-9 text-3xl font-bold">
          {itemInfoQuery.data.title.toUpperCase()}
        </h1>
        {userQuery.data !== null ? (
          <ItemInfoMenu
            itemId={itemId}
            userId={userId}
            activity={activity}
            navigate={navigate}
            itemInfoQuery={itemInfoQuery}
            userQuery={userQuery}
            open={setIsOpen}
            editRef={editRef}
          />
        ) : null}
      </div>
      <div className="flex shrink-0 basis-1/2 bg-zinc-50">
        <div className="basis-[70%] p-4 text-sm sm:text-base">
          {itemInfoQuery.data.description}
        </div>
        {activity === "recipes" ? (
          <div className="basis-[30%] border-l-2 border-solid  border-[#DFE2DB] p-3">
            <h1 className="mb-4 text-center text-lg lg:text-[1.7rem]">
              Składniki
            </h1>
            <ul>
              {itemInfoQuery.data.ingredients.map((item) => (
                <li
                  className="mb-2 ml-4 list-disc text-sm"
                  key={itemInfoQuery.data.ingredients.indexOf(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className=" basis-1/3  text-center">
        {activity === "training_plan" ? (
          <Calendar week={itemInfoQuery.data.training_week} />
        ) : (
          <CommentsContainer comment={itemInfoQuery.data} />
        )}
      </div>

      <Modal open={isOpen} onClose={setIsOpen}>
        {activity === "training_plan" ? (
          <TrainingForm
            close={setIsOpen}
            data={itemInfoQuery.data}
            isEdit={true}
            outsideRef={editRef}
          />
        ) : (
          <RecipeForm
            close={setIsOpen}
            data={itemInfoQuery.data}
            isEdit={true}
            outsideRef={editRef}
          />
        )}
      </Modal>
    </section>
  );
}

export default ItemInfo;
