import { useState } from "react";
import senatiLogo from "../assets/Senati.png";
import "../styles/Login.css";

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

      const response = await fetch(
        "http://80.241.217.53:3000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario,
            password,
          }),
        }
      );

      const data = await response.json();

      /*
        ============================
        ESTA PARTE FUE MODIFICADA
        ============================

        ANTES:
        window.location.href =
        data.redirectUrl;

        PROBLEMA:
        El backend devolvía rutas antiguas
        o incompatibles con React Router.

        Además:
        React necesitaba guardar el rol
        para saber qué dashboard mostrar.

        POR ESO:
        Ahora guardamos información
        en localStorage y redireccionamos
        manualmente según el rol.
      */

      if (response.ok && data.success) {

        /*
          NUEVO:
          Guardamos el rol del usuario.

          Esto permite:
          - Mostrar navbar correcto
          - Proteger rutas
          - Saber si es alumno o vigilante
        */
        localStorage.setItem(
          "role",
          data.role
        );

        /*
          NUEVO:
          Guardamos datos del usuario
          si existen.
        */
        if (data.user) {

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        /*
          NUEVO:
          Redirección manual.

          ANTES:
          Dependíamos de:
          data.redirectUrl

          AHORA:
          React controla las rutas.
        */

        if (data.role === "vigilante") {

          window.location.href =
            "/dashboard-vigilante";

        } else {

          window.location.href =
            "/dashboard-alumno";
        }

      } else {

        alert(
          data.error ||
          "Error al iniciar sesión"
        );
      }

    } catch (error) {

      console.error(error);

      alert(
        "Error de conexión con el servidor"
      );
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