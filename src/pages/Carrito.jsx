import React, { useMemo } from 'react'
import { Container, Table, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Carrito({ items, onRemove, onClear }) {
    const navigate = useNavigate()
    const total = useMemo(
        () => items.reduce((acc, p) => acc + (p.precio * (p.cantidad ?? 1)), 0),
        [items]
    )

    const handleFinalizar = () => {
        const productos = items.map(p => ({
            nombre: p.nombre,
            cantidad: p.cantidad ?? 1,
            precio: p.precio
        }))

        const pedido = {
            productos,
            total,
            perfil: {
                nombre: "",
                correo: "",
                direccion: "",
                telefono: ""
            },
            fechaConfirmacion: new Date().toISOString(),
            status: "confirmado",
            numeroPedido: Math.floor(Math.random() * 1000000)
        }

        try {
            localStorage.setItem('pedido', JSON.stringify(pedido))
        } catch (err) {
            console.warn('No se pudo guardar el pedido en localStorage', err)
        }

        if (typeof onClear === 'function') onClear()
        navigate('/pedidos')
    }

    return (
        <Container className="my-4 text-center">
            <h2 className="page-title">Carrito</h2>
            {items.length === 0 ? (
                <Alert variant="info">Tu carrito está vacío</Alert>
            ) : (
                <>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((p, i) => (
                                <tr key={`${p.id}-${i}`}>
                                    <td>{i + 1}</td>
                                    <td>{p.nombre}{p.cantidad ? ` x${p.cantidad}` : ""}</td>
                                    <td>${( (p.precio * (p.cantidad ?? 1)) ).toLocaleString('es-CL')}</td>
                                    <td>
                                        <Button size="sm" variant="outline-danger" onClick={() => onRemove(i)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Total: ${total.toLocaleString('es-CL')}</h5>
                        <div className="d-flex gap-2">
                            <Button variant="outline-secondary" onClick={onClear}>Vaciar</Button>
                            <Button onClick={handleFinalizar}>Finalizar compra</Button>
                        </div>
                    </div>
                </>
            )}
        </Container>
    )
}