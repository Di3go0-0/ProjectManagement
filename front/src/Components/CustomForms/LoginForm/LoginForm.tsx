import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../../../Interfaces";
import { LoginFormValues, LoginSchema } from "../../../Models";
import { zodResolver } from "@hookform/resolvers/zod";
import InputForm from "../../CustomInput/CustomInput";
import { Link } from "react-router-dom";
import './LoginForm.css'

interface Props {
  handleSingIn: (user: ILogin) => void;
}



export const LoginForm = ({ handleSingIn }: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      mail: "",
      password: "",
    },
  });

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

        <InputForm
          name="password"
          control={control}
          label="Password"
          type="password"
          error={errors.password}
        />

        <div className="Buttons">
          <button className="Button-submit" type="submit">Login</button>
          <Link to={"/register"} className="Button-submit">Register</Link>
        </div>


      </form>
    </div>
  )
}

