import {createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../firebase'

/**
 * Contexto que maneja todo lo relacionado a la autenticación con Firebase Auth.
 * Cuenta con estados y hooks para controlar el usuario actualmente conectado en el
 * sistema. También cuenta con funciones para crear y autenticar usuarios.
 * 
 * @member
 * @property {components} children Componentes hijos que tendrán acceso al contexto
 * @example <caption>Ejemplo del proveedor del contexto</caption>
 *  <AuthProvider>
 *    <Routes>
 *      ...
 *    </Routes>
 *  </AuthProvider>
 * @example <caption>Ejemplo de como usar el contexto en componentes</caption>
 * import { useAuth } from "../contexts";
 * ...
 * const {user, logOut, loading} = useAuth();
 */

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no auth provider");
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logOut = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    return (
        <authContext.Provider value={{signUp, logIn, logOut, user, loading}}>
            {children}
        </authContext.Provider>
    )
}