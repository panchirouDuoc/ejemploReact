import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import ProductoService from '../services/ProductoService';
import axios from 'axios';

const ProductoForm = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [categorias, setCategorias] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            ProductoService.getProductoById(id).then(response => {
                const producto = response.data;
                setNombre(producto.nombre);
                setPrecio(producto.precio);
                setCategoria(producto.categoria);
                setDescripcion(producto.descripcion);
                setImagen(producto.imagen);
            }).catch(error => {
                console.log("Error al obtener el producto:", error);
            });
        }

        // Cargar categorías dinámicamente
        axios.get('http://localhost:8080/api/categorias')
            .then(response => setCategorias(response.data))
            .catch(error => console.error("Error al cargar categorías:", error));

    }, [id]);

    const saveOrUpdateProducto = (e) => {
        e.preventDefault();
        const producto = { nombre, precio: parseFloat(precio), categoria, descripcion, imagen };

        if (id) {
            ProductoService.updateProducto(id, producto).then(() => {
                navigate('/admin/productos'); // Redirige a la lista de productos
            }).catch(error => {
                console.log("Error al actualizar el producto:", error);
            });
        } else {
            ProductoService.createProducto(producto).then(() => {
                navigate('/admin/productos'); // Redirige a la lista de productos
            }).catch(error => {
                console.log("Error al crear el producto:", error);
            });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h2" className="text-center mb-4">{id ? 'Editar Producto' : 'Agregar Producto'}</Card.Title>
                            <Form onSubmit={saveOrUpdateProducto}>
                                <Form.Group className="mb-3" controlId="formNombre">
                                    <Form.Label>Nombre del Producto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: Manzana Fuji"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPrecio">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ej: 1890"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCategoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        required
                                    >
                                        {categorias.map(cat => (
                                            // Usamos cat.nombre porque así viene de la BD
                                            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescripcion">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Descripción detallada del producto"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formImagen">
                                    <Form.Label>URL de la Imagen</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej: /images/manzana.avif"
                                        value={imagen}
                                        onChange={(e) => setImagen(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">La ruta debe ser relativa a la carpeta 'public' de tu proyecto.</Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit">{id ? 'Actualizar Producto' : 'Guardar Producto'}</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductoForm;
