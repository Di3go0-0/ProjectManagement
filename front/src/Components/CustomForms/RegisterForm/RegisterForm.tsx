import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, RegisterSchema } from "../../../Models";
import './RegisterForm.css'
import InputForm from "../../CustomInput/CustomInput";

const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, } = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      mail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="Form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          name="name"
          control={control}
          label="Name"
          type="text"
          error={errors.name}
        />
        <InputForm
          name="mail"
          control={control}
          label="Email"
          type="email"
          error={errors.mail}
        />
        <InputForm
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
        />
        <InputForm
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
        />

        <div className="Buttons">
          <button type="submit" className="Button-submit">
            Register
          </button>


          <button type="button" className="Button-submit">
            Login
          </button>

        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
