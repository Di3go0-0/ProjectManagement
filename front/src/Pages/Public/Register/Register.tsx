import RegisterForm from '../../../Components/CustomForms/RegisterForm/RegisterForm'
import { useAuth } from '../../../Context';
import './Register.css'

export const Register = () => {
  const { signIn } = useAuth();

  return (
    <div className="register-container">
      <RegisterForm handleSingIn={signIn} />
    </div>
  )
}

