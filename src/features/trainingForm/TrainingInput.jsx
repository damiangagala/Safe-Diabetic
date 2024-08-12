import { useEffect } from "react";
import { useFormFields } from "../../hooks/useFormFields";
import FormFields from "./FormFields";

function TrainingInput({ control, day, register, data, isEdit }) {
  const { fields, append, remove, replace } = useFormFields(day, control);

  useEffect(() => {
    if (isEdit === true) {
      data.map((it) => {
        const testing = crypto.randomUUID();
        it.id = testing;
      });

      replace(data);
    }
  }, [replace, data, isEdit]);

  return (
    <div className="min-h-[9rem] basis-[30%] border-2 border-solid border-black text-center">
      <h3>{day}</h3>
      <ul className="flex flex-col">
        {fields.map((item, index) => {
          return (
            <li className="m-2 flex justify-center gap-1" key={item.id}>
              <FormFields
                register={register}
                index={index}
                day={day}
                remove={remove}
              />
            </li>
          );
        })}

        <button type="button" onClick={() => append({})}>
          +
        </button>
      </ul>
    </div>
  );
}

export default TrainingInput;
