import toast from "react-hot-toast";
import { signUp } from "../services/usersAPI";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { mutate: registration, isPending } = useMutation({
    mutationFn: ({ formData }) => signUp(formData.mail, formData.password),
    onSuccess: () => navigate("../login"),
  });

  return (
    <div className="mx-auto my-36 flex w-fit flex-col items-center  rounded-md rounded-r-none bg-zinc-200 p-8">
      <h1 className="p-4 text-center text-5xl">Rejestracja</h1>
      <form
        className="m-10 mb-0 flex w-80 flex-col items-center "
        onSubmit={handleSubmit((formData) => {
          formData.repeat === formData.password
            ? registration({ formData })
            : "Hasła muszą być takie same";
        })}
      >
        <div className="m-1">
          <input
            {...register("mail", {
              required: "Musisz podać maila",
            })}
            className=" w-72 rounded-2xl p-2 pl-3 text-slate-400"
            placeholder="Email"
          />
        </div>
        <div className="m-1">
          <input
            {...register("username", {
              required: "Musisz podać maila",
            })}
            className=" w-72 rounded-2xl p-2 pl-3 text-slate-400"
            placeholder="Nazwa użytkownika"
          />
        </div>
        <div className="m-2 ">
          <input
            {...register("password", { minLength: 6 })}
            className="w-72 rounded-2xl p-2 pl-3 text-slate-400"
            type="password"
            placeholder="Hasło"
          />
        </div>
        <div className="m-2 ">
          <input
            {...register("repeat", { minLength: 6 })}
            className="w-72 rounded-2xl p-2 pl-3 text-slate-400"
            type="password"
            placeholder="Powtórz hasło"
          />
        </div>
        <button
          className="my-5 w-40 cursor-pointer rounded-3xl bg-teal-700 p-2 font-bold text-zinc-50"
          type="submit"
          value="Login"
          disabled={isPending}
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
