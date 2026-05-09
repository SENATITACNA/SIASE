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
      const response = await fetch("http://localhost:3000/login", {
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

        // 🔥 GUARDAR ID DEL ALUMNO EN LOCALSTORAGE
        localStorage.setItem("alumno_id", usuario);

        // 🔥 REDIRECCIONAR
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

        <p className="footer">
          © 2025 Sistema Académico
        </p>

      </div>
    </div>
  );
}

export default Login;