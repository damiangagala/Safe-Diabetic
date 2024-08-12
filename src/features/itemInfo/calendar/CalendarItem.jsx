function CalendarItem({ item }) {
  return (
    <li className="border-b-2 border-zinc-500 last:border-0">
      {item?.name}
      {item?.sets !== "" ? ` ${item.sets}x${item.reps}` : ` ${item?.reps} min`}
    </li>
  );
}

export default CalendarItem;
