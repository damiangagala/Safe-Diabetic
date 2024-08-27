import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

function FormFields({ register, index, day, remove, unit, errors }) {
  const [select, setSelect] = useState(unit);

  function handleRemove(index, e) {
    e.stopPropagation();
    remove(index);
  }

  return (
    <>
      <input
        style={
          errors[day]?.[index]?.name !== undefined
            ? { border: "2px solid red" }
            : {}
        }
        className="w-42 rounded-md p-1 text-emerald-900 md:w-28"
        placeholder="ćwiczenie"
        {...register(`${day}.${index}.name`, {
          required: "Uzupełnij pole.",
          max: { value: 100, message: "Maksymalna długość to 100 znaków." },
        })}
      />

      {select !== "minuty" && (
        <>
          <input
            style={
              errors[day]?.[index]?.sets !== undefined
                ? { border: "2px solid red" }
                : {}
            }
            className=" w-14 rounded-md p-1 text-emerald-900"
            type="number"
            defaultValue={1}
            placeholder={select !== "minuty" ? "serie" : "czas"}
            {...register(`${day}.${index}.sets`, {
              min: { value: 1, message: "Minimalna wartość to 1." },
              max: {
                value: 100,
                message: "Maksymalna wartość to 500 serii.",
              },
            })}
          />
        </>
      )}

      <input
        style={
          errors[day]?.[index]?.reps !== undefined
            ? { border: "2px solid red" }
            : {}
        }
        className=" w-14 rounded-md p-1 text-emerald-900"
        type="number"
        min={1}
        defaultValue={1}
        placeholder="powtórzenia"
        {...register(`${day}.${index}.reps`, {
          min: { value: 1, message: "Minimalna wartość to 1." },
          max: { value: 500, message: "Maksymalna wartość to 500 powtórzeń." },
        })}
      />

      <select
        {...register(`${day}.${index}.jednostka`)}
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        className="w-32 rounded-md p-1 text-emerald-900 lg:w-24"
      >
        <option value="sets">serie</option>
        <option value="minuty">minuty</option>
      </select>

      <button type="button" onClick={(e) => handleRemove(index, e)}>
        <IoIosRemoveCircleOutline size={20} />
      </button>
    </>
  );
}

export default FormFields;
