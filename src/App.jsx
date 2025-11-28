import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import CarritoService from './services/CarritoService';

import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Pedidos from "./pages/Pedidos";
import Blog from "./pages/Blog";
import Formulario from './pages/Formulario';
import Resenias from './pages/resenias';
import Admin from './pages/admin';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';
import CategoriaList from './components/CategoriaList';

function AppContent() {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = useCallback(async () => {
        if (isAuthenticated) {
            try {
                const response = await CarritoService.getCarrito();
                setCartItems(response.data.items || []);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
                setCartItems([]);
            }
        } else {
            setCartItems([]);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleAddToCart = async (product) => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para agregar productos al carrito.");
            return;
        }
        try {
            await CarritoService.agregarProducto(product.id, 1);
            fetchCart();
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    };

    const handleUpdateCart = async (idProducto, newQuantity) => {
        try {
            if (newQuantity < 1) {
                await CarritoService.eliminarProducto(idProducto);
            } else {
                await CarritoService.actualizarCantidad(idProducto, newQuantity);
            }
            fetchCart();
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
        }
    };
    
    const handleRemoveFromCart = async (idProducto) => {
        try {
            await CarritoService.eliminarProducto(idProducto);
            fetchCart();
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await CarritoService.limpiarCarrito();
            fetchCart();
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <AppNavbar cart={cartItems} />
            <div className="flex-grow-1">
                <Routes>
                    {/* Rutas publicas*/}
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos onAdd={handleAddToCart} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/resenias" element={<Resenias />} />

                    {/* Rutas para Usuarios logueados */}
                    <Route path="/carrito" element={<ProtectedRoute><Carrito items={cartItems} onRemove={handleRemoveFromCart} onClear={handleClearCart} onUpdate={handleUpdateCart} /></ProtectedRoute>} />
                    <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                    <Route path="/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />

                    {/* Rutas para admin */}
                    <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
                    <Route path="/admin/productos" element={<ProtectedRoute adminOnly={true}><ProductoList /></ProtectedRoute>} />
                    <Route path="/admin/productos/add" element={<ProtectedRoute adminOnly={true}><ProductoForm /></ProtectedRoute>} />
                    <Route path="/admin/productos/edit/:id" element={<ProtectedRoute adminOnly={true}><ProductoForm /></ProtectedRoute>} />
                    <Route path="/admin/categorias" element={<ProtectedRoute adminOnly={true}><CategoriaList /></ProtectedRoute>} />
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
