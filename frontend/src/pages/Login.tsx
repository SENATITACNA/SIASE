import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import senatiLogo from "../assets/Senati.png";
import "../styles/Login.css";

function Login() {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        try {
          const cookieContent = parts.pop()?.split(';').shift();
          return cookieContent ? JSON.parse(decodeURIComponent(cookieContent)) : null;
        } catch (e) {
          return null;
        }
      }
      return null;
    };

    const session = getCookie('user_session');
    if (session) {
      if (session.rol === "vigilante") {
        navigate("/dashboard-vigilante");
      } else if (session.rol === "alumno") {
        navigate("/dashboard-alumno");
      } else {
        navigate("/dashboard-vigilante");
      }
    }
  }, [navigate]);
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.role === "vigilante") {
          navigate("/dashboard-vigilante");
        } else if (data.role === "alumno") {
          navigate("/dashboard-alumno");
        } else {
          navigate("/dashboard-vigilante"); 
        }
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("No se pudo conectar con el servidor. Revisa que el Backend esté encendido.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <img src={senatiLogo} alt="Logo SENATI" className="logo" />
        <h2 className="title">Sistema Académico</h2>
        <p className="subtitle">Inicia sesión para continuar</p>
        
        <form onSubmit={handleLogin} className="form">
          <input
            type="text"
            placeholder="Ingrese su ID de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="input"
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            autoComplete="current-password"
          />

          <button type="submit" className="button">
            Ingresar
          </button>
        </form>
        
        <p className="footer">© 2026 Sistema Académico SIASE</p>
      </div>
    </div>
  );
}

export default Login;