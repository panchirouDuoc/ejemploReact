import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import ProductoService from '../services/ProductoService';
import { useAuth } from '../auth/AuthContext';

const ProductoForm = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchCategorias = axios.get('http://localhost:8080/api/categorias');
        const fetchProducto = id ? ProductoService.getProductoById(id) : Promise.resolve(null);

        Promise.all([fetchCategorias, fetchProducto])
            .then(([categoriasResponse, productoResponse]) => {
                setCategorias(categoriasResponse.data);
                if (productoResponse) {
                    const producto = productoResponse.data;
                    setNombre(producto.nombre);
                    setPrecio(producto.precio);
                    setCategoria(producto.categoria.nombre || producto.categoria);
                    setDescripcion(producto.descripcion);
                    setImagen(producto.imagen);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar los datos del formulario:", err);
                setError("No se pudieron cargar los datos necesarios para el formulario.");
                setLoading(false);
            });

    }, [id]);

    const saveOrUpdateProducto = (e) => {
        e.preventDefault();
        const producto = { nombre, precio: parseFloat(precio), categoria, descripcion, imagen };

        const action = id 
            ? ProductoService.updateProducto(id, producto, user?.token) 
            : ProductoService.createProducto(producto, user?.token);

        action.then(() => {
            navigate('/admin/productos');
        }).catch(error => {
            console.log(error);
            setError("Error al guardar el producto.");
        });
    };

    if (loading) return <p>Cargando formulario...</p>;

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center">{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={saveOrUpdateProducto}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                                <option value="">Selecciona una categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de la Imagen</Form.Label>
                            <Form.Control type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductoForm;
