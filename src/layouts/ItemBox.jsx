import Menu from "../features/itemList/Menu";
import ItemList from "../features/itemList/ItemList";

import { useParams } from "react-router-dom";

function ItemBox() {
  const { id } = useParams();
  return (
    <>
      <div>
        <div
          style={
            id !== undefined && window.innerWidth < 1024
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
          className="top-22 absolute flex h-[70vh] w-[70vw] flex-col rounded-md bg-zinc-50 md:w-auto md:min-w-[36vw] lg:w-[25vw] xl:w-[20vw]"
        >
          <Menu />
          <ItemList />
        </div>
      </div>
    </>
  );
}

export default ItemBox;
