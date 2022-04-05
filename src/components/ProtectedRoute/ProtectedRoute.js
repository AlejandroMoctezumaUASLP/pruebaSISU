// React
import { useAuth } from "../../contexts";
import { Navigate } from "react-router-dom";

/**
 * Ruta restringida solo a usuarios que estén autenticados. Usa el context "useAuth"
 * para conocer al usuario autenticado. Si el usuario no está autenticado, se le envía
 * a la página de login. Mientras se "carga" el estado del usuario, se muestra un texto
 * de "Cargando".
 * 
 * @member
 * @property {components} children Contenido a renderizar si el usuario está logeado
 * @example
 *  <ProtectedRoute>
 *    {children}
 *  </ProtectedRoute>
 */

export function ProtectedRoute({children}) {
    const {user, loading} = useAuth();

    if(loading) return <h1>Loading</h1>;

    if(!user) return <Navigate to="/login" />;

    return <>{children}</>;
}