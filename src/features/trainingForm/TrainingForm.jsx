import { useForm } from "react-hook-form";
import TrainingInput from "./TrainingInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTrainingPlan, editTrainingPlan } from "../../services/trainingAPI";
import toast from "react-hot-toast";
import { getAuthorId } from "../../services/usersAPI";

function TrainingForm({ close, data, isEdit }) {
  const userQuery = useQuery({
    queryKey: ["loggedProfile"],
    queryFn: getAuthorId,
  });

  const author = userQuery?.data;
  const planId = data?.id;
  const trainingId = data?.training_id;

  const week = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
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
      className="flex flex-wrap gap-3 p-2"
      onSubmit={handleSubmit((formData) => {
        isEdit === true
          ? edit({ formData, author, planId, trainingId })
          : create({ formData, author });
        reset();
        close(false);
      })}
    >
      {week.map((day) => (
        <TrainingInput
          key={week.indexOf(day)}
          control={control}
          day={day}
          data={data?.training_week[day]}
          register={register}
          isEdit={isEdit}
        />
      ))}

      <div className=" flex basis-[30%] flex-col text-center">
        <label className="trainingLabel">Tytuł</label>
        <input className="trainingInput" {...register("title")} />
        <label className="trainingLabel">Opis</label>
        <input className="trainingInput" {...register("description")} />
        <label className="trainingLabel">Czas</label>
        <input className="trainingInput" {...register("time")} />
        <label className="trainingLabel">Trudność</label>
        <input className="trainingInput" {...register("difficulty")} />
      </div>
      <button type="submit">Wyślij</button>
    </form>
  );
}

export default TrainingForm;
