import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import "./CustomInput.css";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = <T extends FieldValues>({ name, control, label, type, error }: Props<T>) => {
  return (
    <div className="form-group">
      <label htmlFor={String(name)}>{label}</label>
      {error && <p className="error">{error.message}</p>}
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => (
          <input
            id={String(name)}
            type={type}
            {...field}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        )}
      />
    </div>
  );
};

export default InputForm;

