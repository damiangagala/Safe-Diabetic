import { useNavigate } from "react-router-dom";
import { getUser, login as loginAPI } from "../services/usersAPI";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { mutate: login } = useMutation({
    mutationFn: loginAPI,
    onSuccess: () => navigate("/", { replace: true }),
    onError: () => null,
  });
  if (isLoading) return;

  function handleOnClick() {
    navigate("../register");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }
  return (
    <div className="mx-auto flex h-full w-[90%]  items-center justify-center">
      <div className="flex h-[30rem] w-96 flex-col items-center justify-center rounded-md bg-zinc-200  lg:rounded-r-none ">
        <h1 className="p-9 text-center text-5xl">Logowanie</h1>
        <form
          className="my-10 flex w-80 flex-col items-center pb-20 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="m-1">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=" w-72 rounded-2xl p-2 pl-3 text-slate-400"
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="m-2 ">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-72 rounded-2xl  p-2 pl-3 "
              type="password"
              placeholder="Hasło"
              value={password}
            />
          </div>
          <button
            className="m-5 w-40 cursor-pointer rounded-3xl bg-teal-600 p-2 font-bold text-zinc-50"
            type="submit"
            value="Login"
          >
            Zaloguj się
          </button>
          {window.innerWidth < 1024 && (
            <button
              onClick={handleOnClick}
              className="w-40 rounded-3xl bg-teal-600 p-2 font-bold text-zinc-50"
            >
              Zarejestruj się
            </button>
          )}
        </form>
      </div>
      {window.innerWidth >= 1024 && (
        <div className="flex h-[30rem] w-96 flex-col items-center justify-center rounded rounded-l-none bg-zinc-300">
          <p className=" text-center text-3xl">
            Jeśli jesteś nowy to zarejestruj się przyciskiem poniżej!
          </p>
          <button
            onClick={handleOnClick}
            className="mt-8 w-40 rounded-3xl bg-teal-600 p-2 font-bold text-zinc-50"
          >
            Zarejestruj się
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
