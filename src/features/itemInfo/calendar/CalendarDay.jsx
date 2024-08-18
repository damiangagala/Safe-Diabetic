import CalendarItem from "./CalendarItem";

function CalendarDay({ item, day }) {
  const data = item?.length !== 0 && item !== null ? Object.values(item) : null;
  return (
    <div className="inline-block basis-[14.3%] border-r-2 border-zinc-50  last:border-0">
      <div className="border-b-2 border-zinc-50 bg-emerald-800 px-4 py-1 text-2xl font-bold text-zinc-100">
        {day}
      </div>
      <ul className="mb-1 px-1 text-sm">
        {data !== null ? (
          data.map((item) => (
            <CalendarItem key={data.indexOf(item)} item={item} />
          ))
        ) : (
          <div className="pt-2">Odpoczynek</div>
        )}
      </ul>
    </div>
  );
}

export default CalendarDay;
