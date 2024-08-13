import { logout } from "../services/usersAPI";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useContext, useState } from "react";
import Modal from "./itemInfo/Modal";
import TrainingForm from "./trainingForm/TrainingForm";
import { SearchContext } from "../contexts/SearchProvider";
import RecipeForm from "./recipeForm/RecipeForm";
import { TbLogout } from "react-icons/tb";
import { GrAddCircle } from "react-icons/gr";

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
    <div className="absolute right-4 top-5 flex basis-1/4 gap-6 p-4">
      {data !== null ? (
        <button className="" onClick={() => setOpenModal(true)}>
          <GrAddCircle size={28} color="white" />
        </button>
      ) : null}
      {data !== null ? (
        <button>
          <TbLogout size={36} color="white" onClick={handleLogin} />
        </button>
      ) : (
        <button
          className="ml-6 min-w-28 rounded-md border-2 border-zinc-50 p-1 text-xl font-bold text-zinc-50"
          onClick={handleLogin}
        >
          Zaloguj
        </button>
      )}

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
