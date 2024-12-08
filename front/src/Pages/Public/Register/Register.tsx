import { useEffect } from 'react';
import { RegisterForm } from '../../../Components';
import { useAuth } from '../../../Context';
import './Register.css'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home/");
    }
  }, [isAuthenticated]);


  return (
    <div className="register-container">
      <RegisterForm handleSingUp={signUp} />
    </div>
  )
}

