import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import ProductoService from '../services/ProductoService';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        fetchProductos();
    }, []);
    
    const fetchProductos = () => {
        ProductoService.getAllProductos().then(response => {
            setProductos(response.data);
        }).catch(error => {
            console.log(error);
        });
    };
    const deleteProducto = (id) => {
        ProductoService.deleteProducto(id).then(() => {
            fetchProductos();
        }).catch(error => {
            console.log(error);
        });
    };
   return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Gestionar Productos</h2>
                <Button as={Link} to="/admin/productos/add" variant="primary">
                    Agregar Nuevo Producto
                </Button>
            </div>
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
        </div>
    );
};

export default ProductoList;