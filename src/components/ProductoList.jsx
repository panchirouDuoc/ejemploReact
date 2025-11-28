import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

import { useAuth } from '../auth/AuthContext';
import ProductoService from '../services/ProductoService';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    
    useEffect(() => {
        fetchProductos();
    }, []);
    
    const fetchProductos = () => {
        setLoading(true);
        setError(null);
        ProductoService.getAllProductos(user?.token).then(response => {
            setProductos(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError("Error al cargar los productos. Por favor, intente de nuevo más tarde.");
            setLoading(false);
        });
    };
    const deleteProducto = (id) => {
        ProductoService.deleteProducto(id, user?.token).then(() => {
            fetchProductos();
        }).catch(error => {
            console.log(error);
            alert("Error al eliminar el producto.");
        });
    };
   return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={12} lg={10}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Gestionar Productos</h2>
                        <Button as={Link} to="/admin/productos/add" variant="primary">
                            Agregar Nuevo Producto
                        </Button>
                    </div>
                    {loading && <p className="text-center">Cargando productos...</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    {!loading && !error && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoría</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(producto => (
                                <tr key={producto.id}>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.precio ? `$${producto.precio.toLocaleString('es-CL')}` : 'N/A'}</td>
                                    <td>{producto.categoria}</td>
                                    <td className="text-center">
                                        <Button as={Link} to={`/admin/productos/edit/${producto.id}`} variant="outline-secondary" size="sm" className="me-2">
                                            Editar
                                        </Button>
                                        <Button onClick={() => deleteProducto(producto.id)} variant="outline-danger" size="sm">
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductoList;