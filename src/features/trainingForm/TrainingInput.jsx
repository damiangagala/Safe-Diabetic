import { useEffect } from "react";
import { useFormFields } from "../../hooks/useFormFields";
import FormFields from "./FormFields";
import { IoIosAddCircleOutline } from "react-icons/io";

function TrainingInput({ control, day, register, data, isEdit }) {
  const { fields, append, remove, replace } = useFormFields(day, control);

  useEffect(() => {
    if (isEdit === true) {
      data.map((activity) => {
        activity.id = crypto.randomUUID();
      });

      replace(data);
    }
  }, [data, isEdit, replace]);

  return (
    <div className="mb-4 text-center">
      <h3 className="text-lg font-bold">{day}</h3>
      <ul className="flex flex-col">
        {fields.map((item, index) => {
          return (
            <li className="m-2 flex justify-center gap-2" key={item.id}>
              <FormFields
                register={register}
                index={index}
                day={day}
                remove={remove}
                unit={data ? data[index]?.jednostka : "minuty"}
              />
            </li>
          );
        })}

        <button
          className="mx-auto mt-1 "
          type="button"
          onClick={() => append({})}
        >
          <IoIosAddCircleOutline size={25} />
        </button>
      </ul>
    </div>
  );
}

export default TrainingInput;
