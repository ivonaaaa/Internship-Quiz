import React, { useState } from "react";
import { useAuth } from "../hooks/user/useAuth";
import { FormBox } from "../components/FormBox";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register(email, password);
    if (response.success) navigate("/");
  };

  return (
    <div>
      <FormBox
        title="Register"
        buttonText={loading ? "Registering..." : "Register"}
        onSubmit={handleRegister}
        switchText="Back to Log In"
        switchPath="/login"
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

export default RegisterPage;
