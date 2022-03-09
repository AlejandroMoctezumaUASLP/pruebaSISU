import { Routes, Route } from "react-router-dom";
import { RegistroPage } from './pages';

/**
 * Componente de la aplicación principal. Cuenta en su interior con todas las rutas de la aplicación.
 * @member
 */
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistroPage />} />
      </Routes>
    </div>
  );
}

export default App;

