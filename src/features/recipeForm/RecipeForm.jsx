import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRecipe, editRecipe } from "../../services/recipesAPI";
import toast from "react-hot-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { getAuthorId } from "../../services/usersAPI";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

function RecipeForm({ close, data, isEdit, outsideRef }) {
  const formRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      !formRef.current?.contains(e.target) &&
      !outsideRef.current?.contains(e.target)
    )
      close(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const id = data?.id;
  const queryClient = useQueryClient();
  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });
  const author = userQuery?.data;

  const { mutate: create } = useMutation({
    mutationFn: ({ formData, author }) => {
      addRecipe(formData, author);
    },
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const ulRef = useRef(null);

  const handleAdd = () => {
    append();

    setTimeout(() => {
      if (ulRef.current) {
        const lastChild = ulRef.current.lastElementChild;
        if (lastChild) {
          lastChild.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 0);
  };

  function handleRemove(index, e) {
    e.stopPropagation();
    remove(index);
  }

  return (
    <div ref={formRef}>
      <h1 className="m-4 text-center text-4xl font-bold">
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
        className="flex flex-col justify-between "
      >
        <label className="p-1 text-lg font-bold">Tytuł</label>
        <input
          className="mb-2 rounded-md p-1 text-emerald-900"
          {...register("title")}
        />
        <label className="text-lg font-bold">Opis</label>
        <textarea
          className="mb-2 h-[5em]  text-wrap rounded-md p-1 text-emerald-900"
          {...register("description")}
        />
        <label className="text-lg font-bold">Czas</label>
        <input
          type="number"
          min={0}
          defaultValue={0}
          className="mb-2 rounded-md p-1 text-emerald-900"
          {...register("time")}
        />
        <label className="text-lg font-bold">Trudność</label>
        <select
          className="mb-4 rounded-md p-1 text-emerald-900"
          {...register("difficulty")}
        >
          <option>Łatwy</option>
          <option>Średni</option>
          <option>Trudny</option>
        </select>
        <ul
          ref={ulRef}
          className="scrollbar flex max-h-[150px] flex-col overflow-auto"
        >
          {fields.map((item, index) => {
            return (
              <li
                className="m-2 mx-auto flex justify-center gap-1"
                key={item.id}
              >
                <input
                  className="w-50 rounded-md p-1 text-emerald-900"
                  {...register(`ingredients.${index}`)}
                />
                <button type="button" onClick={(e) => handleRemove(index, e)}>
                  <IoIosRemoveCircleOutline size={20} />
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="mx-auto mt-1 "
          type="button"
          onClick={() => handleAdd()}
        >
          <IoIosAddCircleOutline size={25} />
        </button>
        <button
          className="mx-auto mt-4 rounded-xl bg-[#6699cc] px-6 py-1 font-bold text-zinc-50"
          type="submit"
        >
          {isEdit === true ? "Edytuj" : "Dodaj"}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
