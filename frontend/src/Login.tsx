import { useState } from "react";
import senatiLogo from "./assets/Senati.png";
import "./styles/Login.css";

function Login() {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!usuario || !password) {
      alert("Completa los campos");
      return;
    }

    try {
      const response = await fetch("http://80.241.217.53:3000/login", {
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
        // Guardamos la información del usuario y su rol para usarla en los dashboards
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.role);
  
        window.location.href = data.redirectUrl;
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

        {/* LOGO */}
        <img
          src={senatiLogo}
          alt="Logo SENATI"
          className="logo"
        />

        {/* TITULO */}
        <h2 className="title">
          Sistema Académico
        </h2>

        {/* SUBTITULO */}
        <p className="subtitle">
          Inicia sesión para continuar
        </p>

        {/* FORMULARIO */}
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

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="input"
          />

          <button
            type="submit"
            className="button"
          >
            Ingresar
          </button>

        </form>

        {/* FOOTER */}
        <p className="footer">
          © 2026 Sistema Académico
        </p>

      </div>
    </div>
  );
}

export default Login;
