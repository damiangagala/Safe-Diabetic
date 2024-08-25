import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  addTrainingLike,
  checkIfLikedTraining,
  checkIfOwnedTraining,
  deleteLikeTraining,
  deleteTrainingPlan,
} from "../../services/trainingAPI";
import {
  addRecipeLike,
  checkIfLikedRecipe,
  checkIfOwnedRecipe,
  deleteRecipe,
  deleteRecipeLike,
} from "../../services/recipesAPI";
import { useLikeMutate } from "../../hooks/useLikeMutate";

function ItemInfoMenu({
  itemId,
  userId,
  activity,
  navigate,
  itemInfoQuery,
  userQuery,
  open,
  editRef,
}) {
  const queryClient = useQueryClient();

  const checkLike = useQuery({
    queryKey: ["checkLike", userId, itemId],
    queryFn: () =>
      activity === "training_plan"
        ? checkIfLikedTraining(userId, itemId)
        : checkIfLikedRecipe(userId, itemId),
    enabled: !!itemId && !!userId,
  });

  const checkOwn = useQuery({
    queryKey: ["checkOwn", userId, itemId],
    queryFn: () =>
      activity === "training_plan"
        ? checkIfOwnedTraining(userId, itemId)
        : checkIfOwnedRecipe(userId, itemId),
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn:
      activity === "training_plan" ? deleteTrainingPlan : deleteRecipe,
    onSuccess: () => {
      toast.success("Usunięto element");
      navigate("/");
    },
  });

  const { mutate: addLike, isPending: addLikePending } = useLikeMutate(
    activity,
    addTrainingLike,
    addRecipeLike,
    queryClient,
  );

  const { mutate: deleteLike, isPending: deleteLikePending } = useLikeMutate(
    activity,
    deleteLikeTraining,
    deleteRecipeLike,
    queryClient,
  );

  if (checkLike.isLoading) return;

  async function handleDelete() {
    deleteItem(itemInfoQuery.data.id);
  }

  async function handleLike() {
    checkLike.data === false
      ? addLike({ userId, itemId })
      : deleteLike(checkLike.data.id);
    checkLike.refetch();
  }

  return (
    <div>
      <button
        className="pr-1 pt-2"
        onClick={handleLike}
        disabled={addLikePending || deleteLikePending}
      >
        {!checkOwn.data && (
          <FaStar
            color={
              checkLike.data === false || checkLike.data === undefined
                ? "gray"
                : "yellow"
            }
          />
        )}
      </button>
      {itemInfoQuery.data.author_id === userQuery.data ? (
        <>
          <button
            ref={editRef}
            onClick={() => open(true)}
            className="pr-1 pt-2"
          >
            <FaEdit />
          </button>
          <button className="p1" onClick={handleDelete}>
            <FaTrash />
          </button>
        </>
      ) : null}
    </div>
  );
}

export default ItemInfoMenu;
