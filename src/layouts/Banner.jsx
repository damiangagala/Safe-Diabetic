import { useNavigate } from "react-router-dom";
import BannerMenu from "../features/BannerMenu";

function Banner() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div className="sticky top-0 z-10 bg-emerald-900">
      <div className="relative mb-4 py-4 pl-6 md:pl-0 md:text-center">
        <h1
          onClick={handleClick}
          className="font-pacifico text-4xl text-white sm:text-5xl"
        >
          Safe Diabetic
        </h1>
        <BannerMenu />
      </div>
    </div>
  );
}

export default Banner;
