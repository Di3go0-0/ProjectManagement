import { RegisterForm } from '../../../Components';
import { useAuth } from '../../../Context';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import '../Css/Auth.css'

export const Register = () => {
  const { SignUp, errors } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isRegistered) {
  //     navigate("/login");
  //   }
  // }, [isRegistered, navigate]);


  return (
    <div className='gradient-background'>
      <RegisterForm handleSingUp={SignUp} serverErrors={errors} />
    </div>
  )
}

