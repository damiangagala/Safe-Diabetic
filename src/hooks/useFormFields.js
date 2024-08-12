import { useFieldArray } from "react-hook-form";

export function useFormFields(name, control) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: name,
  });

  return { fields, append, remove, replace };
}
