import { useState } from "react";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      alert("Completa los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`Bienvenido, ${data.usuario.nombres || data.usuario.nombre}`);
        window.location.href = data.redirectUrl;
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        
        {/* LOGO */}
        <img
          src="/descargar.png"
          alt="logo"
          style={styles.logo}
        />

        <h2>Iniciar Sesión</h2>

        {/* USUARIO */}
        <input
          type="text"
          placeholder="ID"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={styles.input}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {/* BOTÓN */}
        <button type="submit" style={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  logo: {
    width: "80px",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;