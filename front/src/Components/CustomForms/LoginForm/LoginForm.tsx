import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthErrors, ILogin } from "../../../Interfaces";
import { LoginFormValues, LoginSchema } from "../../../Models";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../../CustomInput/CustomInput";
import { Link } from "react-router-dom";
import './LoginForm.css'

interface Props {
  handleSingIn: (user: ILogin) => void;
  serverErrors: IAuthErrors;
}

export const LoginForm = ({ handleSingIn, serverErrors }: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  // console.log(serverErrors);

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    handleSingIn(data);
  }

  return (
    <div className="Form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          name="mail"
          control={control}
          label="Email"
          type="email"
          error={errors.mail}
        />
        {serverErrors && <p className="error">{serverErrors.mail}</p>}
        <InputForm
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
        />
        {serverErrors && <p className="error">{serverErrors.password}</p>}
        <div className="Buttons">
          <button className="Button-submit" type="submit">Login</button>
          <Link to={"/register"} className="Button-submit">Register</Link>
        </div>


      </form>
    </div>
  )
}

