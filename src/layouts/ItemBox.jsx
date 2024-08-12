import Menu from "../features/itemList/Menu";
import ItemList from "../features/itemList/ItemList";

function ItemBox() {
  return (
    <>
      <div className="sticky top-8 flex max-h-[80vh] basis-1/4 flex-col rounded-md bg-zinc-50">
        <Menu />
        <ItemList />
      </div>
    </>
  );
}

export default ItemBox;
