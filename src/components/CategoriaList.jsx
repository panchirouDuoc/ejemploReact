import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState('');
    const { user } = useAuth();
    
    const fetchCategorias = () => {
        axios.get('http://localhost:8080/api/categorias')
            .then(response => setCategorias(response.data))
            .catch(error => console.error("Error al cargar categorías:", error));
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const handleAddCategoria = (e) => {
        e.preventDefault();
        if (!nombreNuevaCategoria.trim()) return;
        axios.post('http://localhost:8080/api/categorias', { nombre: nombreNuevaCategoria }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(() => {
                setNombreNuevaCategoria('');
                fetchCategorias();
            })
            .catch(error => console.error("Error al crear categoría:", error));
    };

    const handleDeleteCategoria = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría? Esto podría afectar a los productos existentes.')) {
            axios.delete(`http://localhost:8080/api/categorias/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(() => fetchCategorias())
                .catch(error => console.error("Error al eliminar categoría:", error));
        }
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <h2 className="text-center mb-4">Gestionar Categorías</h2>
                    <Form onSubmit={handleAddCategoria} className="mb-4">
                        <Row className="justify-content-center">
                            <Col xs={12} md={8}>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        value={nombreNuevaCategoria}
                                        onChange={(e) => setNombreNuevaCategoria(e.target.value)}
                                        placeholder="Nombre de la nueva categoría"
                                    />
                                    <Button type="submit" variant="primary">Agregar</Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map(cat => (
                                <tr key={cat.id}>
                                    <td>{cat.nombre}</td>
                                    <td className="text-center">
                                        <Button onClick={() => handleDeleteCategoria(cat.id)} variant="outline-danger" size="sm">Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default CategoriaList;
