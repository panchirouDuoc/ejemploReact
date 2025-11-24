import React, { useMemo, useState } from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Carrito({ items, onRemove, onClear, onUpdate }) {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [error, setError] = useState("");
    const total = useMemo(
        () => items.reduce((acc, p) => acc + (p.subtotal), 0),
        [items]
    );
    
    const puntosHuerto = useMemo(
        () => Math.floor(total * 0.02),
        [total]
    );

    const handleClearCart = async () => {
        if (!user) return;
        try {
            const response = await fetch('http://localhost:8080/api/carrito', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (!response.ok) throw new Error("No se pudo vaciar el carrito.");
            if (typeof onClear === 'function') onClear();
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            setError(error.message || "No se pudo vaciar el carrito. Inténtalo de nuevo.");
        }
    };

    const handleRemoveItem = async (idProducto) => {
        if (!user) return;
        try {
            const response = await fetch(`http://localhost:8080/api/carrito/producto/${idProducto}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (!response.ok) throw new Error("No se pudo eliminar el item.");
            if (typeof onRemove === 'function') onRemove(idProducto);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            setError(error.message || "No se pudo eliminar el producto. Inténtalo de nuevo.");
        }
    };
   
    const handleFinalizar = async () => {
        if (!isAuthenticated || !user) {
            setError("Debes iniciar sesión para finalizar la compra.");
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/pedidos/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ idUsuario: user.id })
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'No se pudo crear el pedido.');
            }
            if (typeof onClear === 'function') onClear();
            navigate('/pedidos');
        } catch (err) {
            console.error('Error al finalizar la compra:', err);
            setError(err.message);
        }
    };

    return (
        <Container className="my-4 text-center">
            <h2 className="page-title">Carrito</h2>
            {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
            {items.length === 0 ? (
                <Alert variant="info">Tu carrito está vacío</Alert>
            ) : (
                <>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((p, i) => (
                                <tr key={p.idProducto || i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        
                                        {p.nombreProducto}
                                        <div className="d-flex align-items-center justify-content-center mt-1">
                                            <Button size="sm" variant="outline-secondary" onClick={() => onUpdate(p.idProducto, p.cantidad - 1)} disabled={p.cantidad <= 1}>-</Button>
                                            <span className="mx-2">{p.cantidad}</span>
                                            <Button size="sm" variant="outline-secondary" onClick={() => onUpdate(p.idProducto, p.cantidad + 1)}>+</Button>
                                        </div>
                                    </td> 
                                    <td>${p.subtotal.toLocaleString('es-CL')}</td>
                                    <td className="text-center">
                                        <Button size="sm" variant="outline-danger" onClick={() => handleRemoveItem(p.idProducto)}>
                                            <i className="bi bi-trash"></i> Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-0">Total: ${total.toLocaleString('es-CL')}</h5>
                            <small className="text-success">
                                <Badge bg="success" className="me-1">
                                    <i className="bi bi-star-fill me-1"></i>
                                    {puntosHuerto}
                                </Badge>
                                Puntos Huerto a ganar
                            </small>
                        </div>
                        <div className="d-flex gap-2">
                            <Button variant="outline-secondary" onClick={handleClearCart}>Vaciar</Button>
                            <Button onClick={handleFinalizar}>Finalizar compra</Button>
                        </div>
                    </div>
                    <div className="mt-2 text-start">
                        <small className="text-muted">
                            * Gana 2% del valor de tu compra en HUERTO PUNTOS
                        </small>
                    </div>
                </>
            )}
        </Container>
    );
}
