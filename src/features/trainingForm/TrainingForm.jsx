import { useForm } from "react-hook-form";
import TrainingInput from "./TrainingInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTrainingPlan, editTrainingPlan } from "../../services/trainingAPI";
import toast from "react-hot-toast";
import { getAuthorId } from "../../services/usersAPI";
import { useEffect, useRef, useState } from "react";

function TrainingForm({ close, data, isEdit, outsideRef }) {
  const [step, setStep] = useState(0);
  const formRef = useRef(null);
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

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

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid && step < 7) {
      setStep(step + 1);
    }
  };

  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });

  const author = userQuery?.data;
  const planId = data?.id;
  const trainingId = data?.training_id;

  const {
    register,
    trigger,
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
    },
  });

  const { mutate: create } = useMutation({
    mutationFn: ({ formData, author }) => addTrainingPlan(formData, author),
    onSuccess: () => toast.success("Dodano trening"),
    enabled: !!author,
  });
  const queryClient = useQueryClient();

  const { mutate: edit } = useMutation({
    mutationFn: ({ formData, author, planId, trainingId }) =>
      editTrainingPlan(formData, author, planId, trainingId),
    onSuccess: () => {
      toast.success("Edytowano trening");
      queryClient.refetchQueries({ queryKey: ["itemInfoData"] });
    },
  });

  if (userQuery.data === null) return;

  return (
    <div ref={formRef}>
      <h1 className="m-4 text-center text-4xl font-bold">
        {isEdit === true ? "Edytuj trening" : "Nowy trening"}
      </h1>

      <form
        className="scrollbar flex  flex-col justify-between gap-3 overflow-auto p-4"
        onSubmit={handleSubmit(async (formData) => {
          isEdit === true
            ? edit({ formData, author, planId, trainingId })
            : create({ formData, author });
          reset();
          close(false);
        })}
      >
        <div>
          {step === 0 && (
            <div className="mb-6 flex basis-[30%] flex-col  text-left ">
              <label className="text-lg font-bold">Tytuł</label>
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
                className="mb-0 h-[5em] text-wrap rounded-md text-emerald-900"
                {...register("description", {
                  required: "Uzupełnij pole.",
                })}
              />
              {errors.description && (
                <p className="mb-1 pl-2 font-extrabold text-yellow-400">
                  {errors.description.message}
                </p>
              )}
              <label className="text-lg font-bold">Czas</label>
              <input
                type="number"
                min={5}
                defaultValue={5}
                className="mb-0 rounded-md p-1 text-emerald-900"
                {...register("time", {
                  min: { value: 5, message: "Minimalny czas to 5 minut." },
                  max: { value: 180, message: "Maksymalny czas to 180 minut." },
                })}
              />
              {errors.time && (
                <p className="mb-1 pl-2 font-extrabold text-yellow-400">
                  {errors.time.message}
                </p>
              )}
              <label className="text-lg font-bold">Trudność</label>
              <select
                className="rounded-md p-1 text-emerald-900"
                {...register("difficulty", {
                  required: "Uzupełnij pole.",
                })}
              >
                <option>Łatwy</option>
                <option>Średni</option>
                <option>Trudny</option>
              </select>
            </div>
          )}
          {daysOfWeek.map(
            (day, index) =>
              step === index + 1 && (
                <TrainingInput
                  key={index}
                  day={day}
                  control={control}
                  data={data?.training_week[day]}
                  register={register}
                  isEdit={isEdit}
                  errors={errors}
                />
              ),
          )}
        </div>
        <div className="flex flex-col gap-5">
          {
            <button
              style={{ display: step === 7 ? "none" : "block" }}
              className="mx-auto rounded-xl bg-[#6699cc] px-6 py-1 font-bold text-zinc-50"
              type="button"
              onClick={nextStep}
            >
              Dalej
            </button>
          }
          <button
            className="mx-auto flex flex-col gap-2 rounded-xl bg-[#6699cc] px-6 py-1 font-bold text-zinc-50"
            type="submit"
          >
            {isEdit === true ? "Edytuj" : "Dodaj"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrainingForm;
