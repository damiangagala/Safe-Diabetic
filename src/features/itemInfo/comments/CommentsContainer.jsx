import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addRecipeComment,
  getRecipeComments,
} from "../../../services/recipesAPI";
import { getAuthorId } from "../../../services/usersAPI";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { useState } from "react";

function CommentsContainer() {
  const { id: recipeId } = useParams();
  const [newComment, setNewComment] = useState("");

  const commentsQuery = useQuery({
    queryKey: ["comments", recipeId],
    queryFn: () => getRecipeComments(recipeId),
  });

  const { mutate: addComment } = useMutation({
    mutationFn: addRecipeComment,
    onSuccess: commentsQuery.refetch(),
  });

  const { data: authorId, isLoading: authorIsLoading } = useQuery({
    queryKey: ["authorId"],
    queryFn: () => getAuthorId(),
  });

  if (commentsQuery.isLoading || authorIsLoading) return;

  async function handleSubmit(e) {
    e.preventDefault();
    addComment({ recipeId, authorId, newComment });
    setNewComment("");
  }

  return (
    <ul className="h-full  bg-zinc-100">
      {authorId !== null && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Dodaj komentarz..."
            className="mt-2 h-10 w-full p-1 px-2"
          ></input>
        </form>
      )}
      {commentsQuery.data.map((comment) => (
        <Comment
          key={commentsQuery.data.indexOf(comment)}
          commentText={comment.comment}
          info={comment.profiles}
          commentId={comment.id}
        />
      ))}
    </ul>
  );
}

export default CommentsContainer;
