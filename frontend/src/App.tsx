// src/App.tsx
import RegistroForm from "./components/RegistroForm";
import './index.css'; // Asegúrate de que este sea el primero en cargarse

function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <RegistroForm />
    </div>
  );
}

export default App;