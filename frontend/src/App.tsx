import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Estudiante from "./pages/Estudiante";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard-alumno"
          element={<Estudiante />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;