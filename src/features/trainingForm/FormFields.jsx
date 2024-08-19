import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

function FormFields({ register, index, day, remove, unit }) {
  const [select, setSelect] = useState(unit);

  function handleRemove(index, e) {
    e.stopPropagation();
    remove(index);
  }

  return (
    <>
      <input
        className=" w-32 rounded-md p-1 text-emerald-900"
        placeholder="ćwiczenie"
        {...register(`${day}.${index}.name`)}
      />
      {select !== "minuty" ? (
        <input
          className=" w-14 rounded-md p-1 text-emerald-900"
          type="number"
          min={0}
          defaultValue={0}
          placeholder={select !== "minuty" ? "serie" : "czas"}
          {...register(`${day}.${index}.sets`)}
        />
      ) : null}

      <input
        className=" w-14 rounded-md p-1 text-emerald-900"
        type="number"
        min={0}
        defaultValue={0}
        placeholder="powtórzenia"
        {...register(`${day}.${index}.reps`)}
      />

      <select
        {...register(`${day}.${index}.jednostka`)}
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        className=" w-26 rounded-md p-1 text-emerald-900"
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
