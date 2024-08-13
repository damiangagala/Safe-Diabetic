import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe, editRecipe } from "../../services/recipesAPI";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useFormFields } from "../../hooks/useFormFields";

function RecipeForm({ author, close, data, isEdit }) {
  const id = data?.id;
  const queryClient = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: ({ data, author }) => addRecipe(data, author),
    onSuccess: () => toast.success("Dodano przepis"),
  });

  const { mutate: edit } = useMutation({
    mutationFn: ({ formData, author, id }) => editRecipe(formData, author, id),
    onSuccess: () => {
      toast.success("Edytowano przepis");
      queryClient.refetchQueries({ queryKey: ["itemInfoData"] });
    },
  });

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: data?.title,
      time: data?.time,
      difficulty: data?.difficulty,
      description: data?.description,
      ingredients: data?.ingredients,
    },
  });

  const { fields, append, remove } = useFormFields("ingredients", control);

  return (
    <>
      <h1 className="m-4 text-center text-3xl">
        {isEdit === true ? "Edytuj przepis" : "Nowy przepis"}
      </h1>
      <form
        onSubmit={handleSubmit((formData) => {
          isEdit === true
            ? edit({ formData, author, id })
            : create({ formData, author });
          reset();
          close(false);
        })}
        className="flex flex-col justify-between"
      >
        <label>Tytuł</label>
        <input {...register("title")} />
        <label>Czas przygotowania</label>
        <input {...register("time")} />
        <label>Trudność</label>
        <input {...register("difficulty")} />
        <label>Opis</label>
        <input {...register("description")} />
        <label>Składniki</label>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <input {...register(`ingredients.${index}`)} />
                <button type="button" onClick={() => remove(index)}>
                  -
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={() => append()}>
          +
        </button>
        <button type="submit">Wyślij</button>
      </form>
    </>
  );
}

export default RecipeForm;
