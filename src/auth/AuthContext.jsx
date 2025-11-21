import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const SESSION_KEY = 'huerto_hogar_session'; // Cambiado para evitar conflictos

/**
 * Función helper para decodificar un token JWT.
 * No verifica la firma, solo extrae los datos (payload).
 * @param {string} token El token JWT
 * @returns {object | null} El payload del token o null si es inválido.
 */
function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error al decodificar el token:", e);
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar la sesión desde localStorage al iniciar la app
    useEffect(() => {
        try {
            const savedSession = localStorage.getItem(SESSION_KEY);
            if (savedSession) {
                const sessionUser = JSON.parse(savedSession);
                // Opcional: verificar si el token ha expirado
                const tokenData = parseJwt(sessionUser.token);
                if (tokenData && tokenData.exp * 1000 > Date.now()) {
                    setUser(sessionUser);
                } else {
                    // Si el token expiró, limpiar localStorage
                    localStorage.removeItem(SESSION_KEY);
                }
            }
        } catch (error) {
            console.error("No se pudo cargar la sesión:", error);
            localStorage.removeItem(SESSION_KEY);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Inicia sesión llamando al endpoint del backend.
     * @param {{username: string, password: string}} credentials
     */
    const login = async (credentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || 'Credenciales inválidas1');
        }

        const { token } = await response.json();
        const userDataFromToken = parseJwt(token);

        if (!userDataFromToken) {
            throw new Error('Token inválido recibido del servidor.');
        }

        // Construimos el objeto de usuario que usaremos en el frontend
        const sessionUser = {
            id: userDataFromToken.id,
            email: userDataFromToken.sub, // 'sub' (subject) es el email en tu JwtService
            rol: userDataFromToken.rol,   // El rol viene directamente del token
            token: token,                 // ¡Guardamos el token para futuras peticiones!
        };

        setUser(sessionUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

        return sessionUser;
    };

    /**
     * Registra un nuevo usuario llamando al backend.
     * @param {{nombre: string, email: string, password: string, rol: string}} userData
     */
    const register = async ({ nombre, apellido, username, correo, password, rol = 'user' }) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, username, correo, password, rol }),
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || 'Error al registrar el usuario.');
        }

        return await response.json(); // Devuelve el usuario creado desde el backend
    };

    /**
     * Cierra la sesión del usuario.
     */
    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    // El valor del contexto que se pasa a los componentes hijos
    const value = {
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user, // Un booleano para saber si el usuario está logueado
        isAdmin: user?.rol === 'ADMIN', // Un booleano para verificar si es admin
        loading, // Para saber si todavía se está cargando la sesión inicial
    };

    // No renderizar la app hasta que se haya cargado la sesión
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
