import BannerMenu from "../features/BannerMenu";

function Banner() {
  return (
    <div className="banner flex h-[11vh] py-8 text-center text-2xl">
      <h1 className="basis-3/4">SAFE DIABETIC</h1>
      <BannerMenu />
    </div>
  );
}

export default Banner;
