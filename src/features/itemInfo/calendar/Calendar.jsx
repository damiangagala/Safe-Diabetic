import CalendarDay from "./CalendarDay";

function Calendar({ week }) {
  return (
    <div className="flex rounded-b-md bg-zinc-200">
      <CalendarDay item={week.monday} day={"Poniedziałek"} />
      <CalendarDay item={week.tuesday} day={"Wtorek"} />
      <CalendarDay item={week.wednesday} day={"Środa"} />
      <CalendarDay item={week.thursday} day={"Czwartek"} />
      <CalendarDay item={week.friday} day={"Piątek"} />
      <CalendarDay item={week.saturday} day={"Sobota"} />
      <CalendarDay item={week.sunday} day={"Niedziela"} />
    </div>
  );
}

export default Calendar;
