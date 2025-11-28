import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api';
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function getRoleFromToken(token) {
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.rol;
    } catch (e) {
        console.error("Error al decodificar el token:", e);
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    if (payload.exp * 1000 > Date.now()) {
                        const profileResponse = await fetch(`${API_URL}/perfil`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (profileResponse.ok) {
                            const profileData = await profileResponse.json();
                            setUser({ ...profileData, token });
                        } else {
                            logout();
                        }
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Error al cargar la sesión:", error);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUserFromStorage();
    }, []);

    const login = async (credentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Credenciales inválidas');
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);

        const profileResponse = await fetch(`${API_URL}/perfil`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!profileResponse.ok) {
            throw new Error("No se pudo obtener el perfil del usuario después del login.");
        }

        const profileData = await profileResponse.json();
        setUser({ ...profileData, token });
        return { ...profileData, token };
    };

    const register = async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || 'Error al registrar el usuario.');
        }
        return await response.json();
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const value = {
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
