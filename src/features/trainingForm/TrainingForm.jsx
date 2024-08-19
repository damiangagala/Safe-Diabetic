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

  const nextStep = () => {
    setStep((s) => s + 1);
  };

  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });

  const author = userQuery?.data;
  const planId = data?.id;
  const trainingId = data?.training_id;

  const { register, control, handleSubmit, reset } = useForm({
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
    <div ref={formRef} className="h-full ">
      <h1 className="m-4 text-center text-4xl font-bold">
        {isEdit === true ? "Edytuj trening" : "Nowy trening"}
      </h1>

      <form
        className="flex h-[90%] flex-col justify-between gap-3 overflow-auto p-4"
        onSubmit={handleSubmit((formData) => {
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
                {...register("title")}
              />
              <label className="text-lg font-bold">Opis</label>
              <textarea
                className="mb-2 h-[5em] text-wrap rounded-md text-emerald-900"
                {...register("description")}
              />
              <label className="text-lg font-bold">Czas</label>
              <input
                className="mb-2 rounded-md p-1 text-emerald-900"
                {...register("time")}
              />
              <label className="text-lg font-bold">Trudność</label>
              <select
                className="rounded-md p-1 text-emerald-900"
                {...register("difficulty")}
              >
                <option>Łatwy</option>
                <option>Średni</option>
                <option>Trudny</option>
              </select>
            </div>
          )}
          {step === 1 && (
            <TrainingInput
              key={0}
              control={control}
              day={"Poniedziałek"}
              data={data?.training_week["monday"]}
              register={register}
              isEdit={isEdit}
            />
          )}
          {step === 2 && (
            <TrainingInput
              key={1}
              control={control}
              day={"Wtorek"}
              data={data?.training_week["tuesday"]}
              register={register}
              isEdit={isEdit}
            />
          )}
          {step === 3 && (
            <TrainingInput
              key={2}
              control={control}
              day={"Środa"}
              data={data?.training_week["wednesday"]}
              register={register}
              isEdit={isEdit}
            />
          )}
          {step === 4 && (
            <TrainingInput
              key={3}
              control={control}
              day={"Czwartek"}
              data={data?.training_week["thursday"]}
              register={register}
              isEdit={isEdit}
            />
          )}
          {step === 5 && (
            <TrainingInput
              key={4}
              control={control}
              day={"Piątek"}
              data={data?.training_week["friday"]}
              register={register}
              isEdit={isEdit}
            />
          )}
          {step === 6 && (
            <TrainingInput
              key={5}
              control={control}
              day={"Sobota"}
              data={data?.training_week["saturday"]}
              register={register}
              isEdit={isEdit}
            />
          )}
          {step === 7 && (
            <TrainingInput
              key={6}
              control={control}
              day={"Niedziela"}
              data={data?.training_week["sunday"]}
              register={register}
              isEdit={isEdit}
            />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <button
            className="mx-auto rounded-xl bg-[#6699cc] px-6 py-1 font-bold text-zinc-50"
            type="button"
            onClick={nextStep}
          >
            Dalej
          </button>
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
