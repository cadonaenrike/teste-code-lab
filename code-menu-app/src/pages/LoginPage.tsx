import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { accessToken, message } = await login(email, password);
      if (!accessToken) {
        throw new Error(message || "Erro desconhecido ao efetuar o login.");
      }
      localStorage.setItem("authToken", accessToken);
      navigate("/admin");
    } catch (err) {
      let errorMessage = "Erro ao efetuar o login. Por favor, tente novamente.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}{" "}
        <div className="input-container">
          <label>E-mail:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
