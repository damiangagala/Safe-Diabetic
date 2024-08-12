import { useForm } from "react-hook-form";
import TrainingInput from "./TrainingInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTrainingPlan, editTrainingPlan } from "../../services/trainingAPI";
import toast from "react-hot-toast";
import { getAuthorId } from "../../services/usersAPI";
import { useState } from "react";

function TrainingForm({ close, data, isEdit }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((step) => step + 1);
  };

  const previousStep = () => {
    setStep((step) => step - 1);
  };

  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });

  const author = userQuery?.data;
  const planId = data?.id;
  const trainingId = data?.training_id;

  const week = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

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
      {/* {week.map((day) => (
        <TrainingInput
          key={week.indexOf(day)}
          control={control}
          day={day}
          data={data?.training_week[day]}
          register={register}
          isEdit={isEdit}
        />
      ))} */}

      {step === 0 && (
        <div className="mb-6 flex basis-[30%] flex-col text-center ">
          <label className="trainingLabel">Tytuł</label>
          <input className="trainingInput" {...register("title")} />
          <label className="trainingLabel">Opis</label>
          <input className="trainingInput" {...register("description")} />
          <label className="trainingLabel">Czas</label>
          <input className="trainingInput" {...register("time")} />
          <label className="trainingLabel">Trudność</label>
          <input className="trainingInput" {...register("difficulty")} />
        </div>
      )}

      {step === 1 && (
        <TrainingInput
          key={week.indexOf("Poniedziałek")}
          control={control}
          day={"Poniedziałek"}
          data={data?.training_week["monday"]}
          register={register}
          isEdit={isEdit}
        />
      )}
      {step === 2 && (
        <TrainingInput
          key={week.indexOf("Wtorek")}
          control={control}
          day={"Wtorek"}
          data={data?.training_week["tuesday"]}
          register={register}
          isEdit={isEdit}
        />
      )}
      <div className="mx-auto flex flex-col gap-2">
        {step !== 7 && (
          <button type="button" onClick={nextStep}>
            Dalej
          </button>
        )}

        {step === 7 && (
          <button type="submit">{isEdit === true ? "Edytuj" : "Dodaj"}</button>
        )}
      </div>
    </form>
  );
}

export default TrainingForm;
