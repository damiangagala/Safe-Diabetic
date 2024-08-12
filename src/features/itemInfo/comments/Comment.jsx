import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../../../hooks/useGetUser";
import { deleteRecipeComment } from "../../../services/recipesAPI";

function Comment({ commentText, info, commentId }) {
  const { data, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteRecipeComment,
    onSuccess: queryClient.refetchQueries({ queryKey: ["comments"] }),
  });
  if (isLoading) return;

  return (
    <li className="relative my-2 min-h-min bg-[#DFE2DB]  p-2 text-left">
      {info.user_id === data?.id ? (
        <button
          onClick={() => deleteComment(commentId)}
          className="absolute right-2 top-1"
        >
          X
        </button>
      ) : null}
      <p>{commentText}</p>
      <span className="text-xs">{info.username}</span>
    </li>
  );
}

export default Comment;
