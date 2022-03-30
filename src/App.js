import { Routes, Route } from "react-router-dom";
import { HomePage, RegistroPage, LoginPage } from './pages';
import { AuthProvider } from "./contexts"
import { ProtectedRoute } from "./components"

/**
 * Componente de la aplicación principal. Cuenta en su interior con todas las rutas de la aplicación.
 * @member
 */
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegistroPage />}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

