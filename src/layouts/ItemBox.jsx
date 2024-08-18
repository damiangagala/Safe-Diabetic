import Menu from "../features/itemList/Menu";
import ItemList from "../features/itemList/ItemList";

function ItemBox() {
  return (
    <>
      <div className="basis-1/4 ">
        <div className="top-22 absolute flex h-[80vh] w-[23vw] flex-col rounded-md bg-zinc-50">
          <Menu />
          <ItemList />
        </div>
      </div>
    </>
  );
}

export default ItemBox;
