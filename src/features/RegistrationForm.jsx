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
    mutationFn: ({ formData }) =>
      signUp(formData.mail, formData.password, formData.username),
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
          {errors.mail && (
            <p className="mb-1 pl-2 font-extrabold text-red-500">
              {errors.mail.message}
            </p>
          )}
        </div>
        <div className="m-1">
          <input
            {...register("username", {
              required: "Musisz podać nazwę użytkownika",
              minLength: {
                value: 3,
                message: "Nazwa użytkownika musi mieć minimum 3 znaki",
              },
              amxLength: {
                value: 12,
                message: "Nazwa użytkownika musi mieć maksymalnie 12 znaków",
              },
            })}
            className=" w-72 max-w-80 rounded-2xl p-2 pl-3 text-slate-400"
            placeholder="Nazwa użytkownika"
          />
          {errors.username && (
            <p className="mb-1 w-72 pl-2 font-extrabold text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="m-1 ">
          <input
            {...register("password", {
              required: "Uzupełnij pole.",
              minLength: {
                value: 6,
                message: "Minimalna długość hasła to 6 znaków",
              },
              maxLength: {
                value: 30,
                message: "Maksymalna długość hasła to 30 znaków",
              },
            })}
            className="w-72 rounded-2xl p-2 pl-3 text-slate-400"
            type="password"
            placeholder="Hasło"
          />
          {errors.password && (
            <p className="mb-1 w-72 pl-2 font-extrabold text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="m-1">
          <input
            {...register("repeat", {
              required: "Uzupełnij pole",
              minLength: {
                value: 6,
                message: "Minimalna długość hasła to 6 znaków",
              },
            })}
            className="w-72 rounded-2xl p-2 pl-3 text-slate-400"
            type="password"
            placeholder="Powtórz hasło"
          />
          {errors.repeat && (
            <p className="mb-1 w-72 pl-2 font-extrabold text-red-500">
              {errors.repeat.message}
            </p>
          )}
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
