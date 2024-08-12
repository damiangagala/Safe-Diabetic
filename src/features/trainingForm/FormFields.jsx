import { useState } from "react";

function FormFields({ register, index, day, remove }) {
  const [select, setSelect] = useState("sets");

  return (
    <>
      <input
        className="w-32"
        placeholder="ćwiczenie"
        {...register(`${day}.${index}.name`)}
      />
      {select !== "minuty" ? (
        <input
          className="h-7 w-14"
          type="number"
          placeholder={select !== "minuty" ? "serie" : "czas"}
          {...register(`${day}.${index}.sets`)}
        />
      ) : null}

      <input
        className="h-7 w-14"
        type="number"
        placeholder="powtórzenia"
        {...register(`${day}.${index}.reps`)}
      />

      <select
        {...register(`${day}.${index}.jednostka`)}
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        className="h-7 w-28"
      >
        <option value="sets">sets</option>
        <option value="minuty">minuty</option>
      </select>
      <button type="button" onClick={() => remove(index)}>
        -
      </button>
    </>
  );
}

export default FormFields;
