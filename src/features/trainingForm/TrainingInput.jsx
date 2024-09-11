import { useEffect } from "react";
import FormFields from "./FormFields";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useFieldArray } from "react-hook-form";

function TrainingInput({ control, day, register, data, isEdit, errors }) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: day,
  });

  const translate = {
    monday: "Poniedziałek",
    tuesday: "Wtorek",
    wednesday: "Środa",
    thursday: "Czwartek",
    friday: "Piątek",
    saturday: "Sobota",
    sunday: "Niedziela",
  };

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
      <h3 className="text-lg font-bold">{translate[day]}</h3>
      <ul className="flex flex-col">
        {fields.map((item, index) => {
          return (
            <li
              className="m-2 flex flex-col items-center gap-2 rounded-lg border-2 border-zinc-50 py-2 md:flex-row md:justify-center md:border-none"
              key={item.id}
            >
              <FormFields
                errors={errors}
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
          style={{ display: fields.length > 6 ? "none" : "block" }}
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
