import { useEffect } from 'react';
import { RegisterForm } from '../../../Components';
import { useAuth } from '../../../Context';
import './Register.css'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { SignUp, isRegistered, errors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [isRegistered, navigate]);


  return (
    <div className="register-container">
      <RegisterForm handleSingUp={SignUp} serverErrors={errors} />
    </div>
  )
}

