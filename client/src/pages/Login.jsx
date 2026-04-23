import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed"
      );
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Login
        </button>

        {error && <p className="error-msg">{error}</p>}

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>

        <p className="demo-note">
          Admin demo: admin@example.com / admin123
        </p>
      </form>
    </div>
  );
}

export default Login;