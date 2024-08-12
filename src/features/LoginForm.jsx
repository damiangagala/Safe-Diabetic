import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../services/usersAPI";
import { useState } from "react";
import { useGetUser } from "../hooks/useGetUser";
import { useMutation } from "@tanstack/react-query";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useGetUser();

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
    <div className="mx-auto flex w-fit">
      <div className=" my-48 flex w-fit flex-col items-center  rounded-md rounded-r-none bg-slate-200 p-20 pb-0">
        <h1 className="p-9 text-center text-5xl">Logowanie</h1>
        <form
          className="m-10 flex w-80 flex-col items-center pb-20 "
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
              className="w-72 rounded-2xl p-2 pl-3 text-slate-400"
              type="password"
              placeholder="Hasło"
              value={password}
            />
          </div>
          <button
            className="m-5 w-40 cursor-pointer rounded-3xl bg-slate-300 p-2"
            type="submit"
            value="Login"
          >
            Zaloguj się
          </button>
        </form>
      </div>
      <div className="mx-auto my-48 flex w-96 flex-col  items-center rounded rounded-l-none bg-slate-600 px-9">
        <p className="mt-48 text-center text-3xl">
          If you are new here you can sign up using button below!
        </p>
        <button
          onClick={handleOnClick}
          className="m-5 mt-8 w-40 rounded-3xl bg-slate-300 p-2"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
