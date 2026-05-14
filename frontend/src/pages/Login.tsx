import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import senatiLogo from "../assets/Senati.png";
import { API_BASE } from "../services/api";
import "../styles/Login.css";

function Login() {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!usuario || !password) {
      alert("Completa los campos");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("user", JSON.stringify({ ...data.user, role: data.role }));
        navigate(data.redirectUrl);
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <img
          src={senatiLogo}
          alt="Logo SENATI"
          className="logo"
        />
        <h2 className="title">
          Sistema Académico
        </h2>
        <p className="subtitle">
          Inicia sesión para continuar
        </p>
        <form
          onSubmit={handleLogin}
          className="form"
        >

          <input
            type="text"
            placeholder="ID"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
            className="input"
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="input password-input"
            />
            <button 
              type="button" 
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="button"
          >
            Ingresar
          </button>

        </form>
        <p className="footer">
          © 2026 Sistema Académico
        </p>

      </div>
    </div>
  );
}

export default Login;
