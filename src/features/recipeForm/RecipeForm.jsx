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

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
          {...register("title", {
            required: "Uzupełnij pole.",
            maxLength: {
              value: 100,
              message: "Maksymalna długość to 100 znaków.",
            },
          })}
        />

        {errors.title && (
          <p className="mb-0 pl-2 font-extrabold text-yellow-400">
            {errors.title.message}
          </p>
        )}

        <label className="text-lg font-bold">Opis</label>
        <textarea
          className="mb-2 h-[5em]  text-wrap rounded-md p-1 text-emerald-900"
          {...register("description", {
            required: "Uzupełnij pole.",
            maxLength: {
              value: 10000,
              message: "Maksymalna długość to 10000 znaków.",
            },
          })}
        />

        {errors.description && (
          <p className="mb-0 pl-2 font-extrabold text-yellow-400">
            {errors.description.message}
          </p>
        )}

        <label className="text-lg font-bold">Czas</label>
        <input
          type="number"
          defaultValue={5}
          className="mb-2 rounded-md p-1 text-emerald-900"
          {...register("time", {
            required: "Uzupełnij pole.",
            max: {
              value: 500,
              message: "Maksymalna wartość to 500 minut.",
            },
            min: { value: 5, message: "Minimalny czas to 5 minut." },
          })}
        />

        {errors.time && (
          <p className="mb-0 pl-2 font-extrabold text-yellow-400">
            {errors.time.message}
          </p>
        )}

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
          className="scrollbar flex max-h-[90px] flex-col overflow-auto lg:max-h-[100px]"
        >
          {fields.map((item, index) => {
            return (
              <li
                className="m-2 mx-auto flex justify-center gap-1"
                key={item.id}
              >
                {errors.ingredients?.[index] && (
                  <p className=" text-2xl font-extrabold text-red-500">!</p>
                )}
                <input
                  className="w-50 rounded-md p-1 text-emerald-900"
                  {...register(`ingredients.${index}`, {
                    required: "Uzupełnij pole.",
                    maxLength: {
                      value: 100,
                      message: "Maksymalna długość to 100 znaków.",
                    },
                  })}
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
