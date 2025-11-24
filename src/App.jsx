import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Footer from './components/Footer';
import Pedidos from "./pages/Pedidos.jsx";
import Blog from "./pages/Blog.jsx";
import Formulario from './pages/Formulario.jsx';
import Resenias from './pages/resenias.jsx';
import Admin from './pages/admin.jsx';
import ProductoList from './components/ProductoList.jsx';
import ProductoForm from './components/ProductoForm.jsx';
import CategoriaList from './components/CategoriaList.jsx';



function AppContent() {
    const { user, isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const fetchCart = useCallback(async () => {
        if (isAuthenticated && user?.token) {
            try {
                const response = await fetch('http://localhost:8080/api/carrito', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (response.ok) {
                    const cartData = await response.json();
                    setCartItems(cartData.items || []);
                } else {
                    console.error("Error al obtener el carrito");
                    setCartItems([]);
                }
            } catch (error) {
                console.error("Error de red al obtener el carrito:", error);
            }
        } else {
            setCartItems([]);
        }
    }, [isAuthenticated, user]);


    useEffect(() => {
        fetchCart();
    }, [fetchCart]);
    const handleAddToCart = async (product) => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/carrito/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ idProducto: product.id, cantidad: 1 })
            });
            if (response.ok) {
                fetchCart();
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    };

    const handleRemoveFromCart = async (idProducto) => {
        fetchCart();
    };


    const handleClearCart = () => {
        fetchCart();
    };

    const handleUpdateCart = async (idProducto, newQuantity) => {
        if (newQuantity < 1) {
            await handleRemoveFromCart(idProducto);
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/carrito/producto/${idProducto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ cantidad: newQuantity })
            });
            if (response.ok) {
                fetchCart();
            }
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AppNavbar cart={cartItems} />
            <div className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos onAdd={handleAddToCart} />} />
                    <Route path="/carrito" element={
                        <ProtectedRoute>
                            <Carrito items={cartItems} onRemove={handleRemoveFromCart} onClear={handleClearCart} onUpdate={handleUpdateCart} />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/pedidos" element={<Pedidos />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/resenias" element={<Resenias />} />
                    <Route path="/admin" element={
                        <ProtectedRoute adminOnly>
                            <Admin />
                        </ProtectedRoute>
                    } >
                        <Route path="productos" element={<ProductoList />} />
                        <Route path="productos/add" element={<ProductoForm />} />
                        <Route path="productos/edit/:id" element={<ProductoForm />} />
                        <Route path="categorias" element={<CategoriaList />} />
                    </Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}
