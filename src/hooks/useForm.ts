import { useState } from "react";

export const useForm = <T>(
  initialValues: T,
  callback?: (v: string) => void
): [T, (e: any) => void] => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: any) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: callback ? callback(e.target.value) : e.target.value,
      };
    });
  };

  return [values, handleChange];
};
