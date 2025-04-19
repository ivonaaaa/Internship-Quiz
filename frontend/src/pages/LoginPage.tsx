import React, { useState } from "react";
import { useAuth } from "../hooks/user/useAuth";
import { FormBox } from "../components/FormBox";
import { useNavigate } from "react-router-dom";
import "../styles/pages/LoginAndRegister.css";

const LoginPage = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.success) navigate("/");
  };

  return (
    <div className="form">
      <FormBox
        title="Log In"
        buttonText={loading ? "Logging in..." : "Log In"}
        onSubmit={handleLogin}
        switchText="Register"
        switchPath="/register"
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginPage;
