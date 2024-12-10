import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../../Components';
import { useAuth } from '../../../Context';
import './Login.css'

export const Login = () => {
  const { SingIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/private/home/");
    }
  }, [isAuthenticated, navigate]);


  return (
    <div className="login-container">
      <LoginForm handleSingIn={SingIn} />
    </div>
  )
}
