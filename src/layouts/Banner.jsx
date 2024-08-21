import BannerMenu from "../features/BannerMenu";

function Banner() {
  return (
    <div className="sticky top-0 z-10 bg-emerald-900">
      <div className="relative mb-4 py-4 text-center">
        <h1 className="font-pacifico text-5xl text-white">Safe Diabetic</h1>
        <BannerMenu />
      </div>
    </div>
  );
}

export default Banner;
