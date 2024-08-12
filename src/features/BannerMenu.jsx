import { logout } from "../services/usersAPI";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useContext, useState } from "react";
import Modal from "./itemInfo/Modal";
import TrainingForm from "./trainingForm/TrainingForm";
import { SearchContext } from "../contexts/SearchProvider";
import RecipeForm from "./recipeForm/RecipeForm";

function BannerMenu() {
  const { isLoading, data, refetch } = useGetUser();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { searchParams } = useContext(SearchContext);
  const activity = searchParams.get("activity");

  if (isLoading) return <p>Loading...</p>;

  async function handleLogin() {
    if (data !== null) {
      logout();
      refetch();
      navigate("../");
    }
    if (data === null) navigate("/login");
  }

  return (
    <div className="absolute right-4 top-5 basis-1/4 p-4">
      <button
        className="min-w-28 rounded-md border-2 border-zinc-50 p-1 text-xl font-bold text-zinc-50"
        onClick={handleLogin}
      >
        {data === null ? "Zaloguj" : "Wyloguj"}
      </button>
      {data !== null ? (
        <button onClick={() => setOpenModal(true)}>Dodaj</button>
      ) : null}

      <Modal open={openModal} onClose={setOpenModal}>
        {activity === "training_plan" ? (
          <TrainingForm close={setOpenModal} />
        ) : (
          <RecipeForm close={setOpenModal} />
        )}
      </Modal>
    </div>
  );
}

export default BannerMenu;
