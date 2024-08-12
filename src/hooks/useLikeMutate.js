import { useMutation } from "@tanstack/react-query";

export function useLikeMutate(
  activity,
  trainingFunction,
  recipeFunction,
  queryClient,
) {
  const { mutate, isPending } = useMutation({
    mutationFn:
      activity === "training_plan" ? trainingFunction : recipeFunction,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["checkLike"],
      });
    },
  });
  return { mutate, isPending };
}
