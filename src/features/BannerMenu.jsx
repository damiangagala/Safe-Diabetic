import { logout } from "../services/usersAPI";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { useContext, useEffect, useRef, useState } from "react";
import Modal from "./itemInfo/Modal";
import TrainingForm from "./trainingForm/TrainingForm";
import { SearchContext } from "../contexts/SearchProvider";
import RecipeForm from "./recipeForm/RecipeForm";
import { IoMdLogOut } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

function BannerMenu() {
  const { isLoading, data, refetch } = useGetUser();
  const [openModal, setOpenModal] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const navigate = useNavigate();
  const { searchParams } = useContext(SearchContext);
  const activity = searchParams.get("activity");
  const dropdownRef = useRef(null);
  const createRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!dropdownRef.current?.contains(e.target)) setDropdownMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
    <div className="absolute right-4 top-4 flex basis-1/4 cursor-pointer gap-6 ">
      <span ref={dropdownRef} onClick={() => setDropdownMenu(!dropdownMenu)}>
        <MdAccountCircle size={51} color="white" />
      </span>

      {dropdownMenu && (
        <ul className=" absolute right-0 top-14 z-10 rounded-md border-2 border-zinc-100 bg-emerald-800 px-2 py-1">
          <li className="cursor-pointer ">
            <span
              ref={createRef}
              className="flex gap-2 p-1 font-bold text-zinc-50"
              onClick={() => setOpenModal(!openModal)}
            >
              <IoAddCircleOutline size={25} color="white" />
              Dodaj
            </span>
          </li>
          <li className="cursor-pointer ">
            <span className="flex gap-2 p-1 font-bold text-zinc-50">
              <IoMdLogOut size={25} onClick={handleLogin} />
              Wyloguj
            </span>
          </li>
        </ul>
      )}

      <Modal open={openModal} onClose={setOpenModal}>
        {activity === "training_plan" ? (
          <TrainingForm close={setOpenModal} outsideRef={createRef} />
        ) : (
          <RecipeForm close={setOpenModal} outsideRef={createRef} />
        )}
      </Modal>
    </div>
  );
}

export default BannerMenu;
