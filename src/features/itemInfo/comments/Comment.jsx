import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRecipeComment } from "../../../services/recipesAPI";
import { FaTrash } from "react-icons/fa";
import { getUser } from "../../../services/usersAPI";

function Comment({ commentText, info, commentId }) {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteRecipeComment,
    onSuccess: queryClient.refetchQueries({ queryKey: ["comments"] }),
  });

  if (isLoading) return;

  return (
    <li className="flex flex-nowrap justify-between border-b-2 border-zinc-400 bg-zinc-100 p-2 text-left first:border-t-2">
      <div>
        <p>{commentText}</p>
        <span className="text-xs">{info.username}</span>
      </div>

      {info.user_id === data?.id ? (
        <button onClick={() => deleteComment(commentId)} className="">
          <FaTrash size={14} />
        </button>
      ) : null}
    </li>
  );
}

export default Comment;
