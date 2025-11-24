import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const SESSION_KEY = 'huerto_hogar_session';
function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error al decodificar el token:", e);
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserOnLoad = async () => {
            try {
                const savedToken = localStorage.getItem('token');
                if (savedToken) {
                    const tokenData = parseJwt(savedToken);
                    if (tokenData && tokenData.exp * 1000 > Date.now()) {
                        const profileResponse = await fetch(`${API_URL}/perfil`, {
                            headers: { 'Authorization': `Bearer ${savedToken}` }
                        });
                        if (profileResponse.ok) {
                            const profileData = await profileResponse.json();
                            setUser({ ...profileData, token: savedToken });
                        } else {
                            logout();
                        }
                    } else {
                        logout();
                    }
                }
            } catch (error) {
                console.error("No se pudo cargar la sesión:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };
        fetchUserOnLoad();
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
        const sessionUser = { ...profileData, token };

        setUser(sessionUser);
        return sessionUser;
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

    const updateUser = async (profileData) => {
        if (!user?.token) {
            throw new Error("No estás autenticado.");
        }

        const response = await fetch(`${API_URL}/perfil`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "No se pudo actualizar el perfil.");
        }

        const updatedUser = await response.json();
        setUser(prevUser => ({ ...prevUser, ...updatedUser }));
    };

    const value = {
        user,
        login,
        logout,
        register,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.rol?.toLowerCase() === 'admin',
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
