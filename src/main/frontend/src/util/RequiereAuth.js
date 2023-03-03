import { Navigate } from "react-router-dom";


/**
 * Componente que protege las rutas y solo permite entrar si el 
 * usuario es candidato a registrarse o actualizar datos
*/
function RequireAuth({ token, children }) {
    return token !== null && token !== "null" ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;