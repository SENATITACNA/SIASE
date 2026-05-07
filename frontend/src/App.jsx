import { useState } from "react";
import Login from "./Login";
import EstudianteMenu from "./components/EstudianteMenu";
import VigilanteMenu from "./components/VigilanteMenu";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    window.location.href = "/"; 
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      {user.rol === 'estudiante' ? (
        <EstudianteMenu userData={user.usuario} onLogout={handleLogout} />
      ) : (
        <VigilanteMenu userData={user.usuario} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;