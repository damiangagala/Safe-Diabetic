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
    <div className="basis-1/4">
      <button className="" onClick={handleLogin}>
        {data === null ? "login" : "logout"}
      </button>
      <button onClick={() => setOpenModal(true)}>Create</button>

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
