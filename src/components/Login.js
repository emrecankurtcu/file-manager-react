import React , { useState,useEffect }from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';


export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
      const user = authService.getCurrentUser();
      if(user){
        navigate("/home");
      }
      
  }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
  
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await authService.login(email, password).then(
          () => {
            navigate("/home");
          },
          (error) => {
            console.log(error.message)
            setErrorMessage(error.message);
          }
        );
      } catch (err) {
      }
    };

  return (
    <div className="auth-form-container">
    <form className="auth-form" onSubmit={handleLogin}>
      <div className="auth-form-content">
        <div className="form-group mt-3">
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <p>{errorMessage}</p>
      </div>
    </form>
  </div>
  )
}