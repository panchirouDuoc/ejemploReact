import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import ProductoService from '../services/ProductoService';
import axios from 'axios';

export default function Productos({ onAdd }) {
    const [selectedCategory, setSelectedCategory] = useState("todos")
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        ProductoService.getAllProductos()
            .then(response => {
                setAllProducts(response.data);
                setFilteredProducts(response.data); // Mostrar todos los productos inicialmente
            })
            .catch(error => console.error("Error al cargar los productos:", error));

        axios.get('http://localhost:8080/api/categorias')
            .then(response => setCategorias(response.data))
            .catch(error => console.error("Error al cargar categorías:", error));
    }, []);

    const handleCategoryChange = (e) => {
        const value = e.target.value
        setSelectedCategory(value)
        if (value === "todos") {
            setFilteredProducts(allProducts)
        } else {
            setFilteredProducts(allProducts.filter(p => p.categoria === value))
        }
    }

    return (
        <Container className="my-5 text-center">
            <h2 className="page-title">Productos</h2>
            <Row className="mb-4">
                <Col md={6} className="mx-auto">
                    <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="todos">Todos</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                {filteredProducts.map(p => (
                    <Col md={4} key={p.id} className="product-card mb-4">
                        <Card className="h-100">
                            <Card.Img variant="top" src={p.imagen} alt={p.nombre} />
                            <Card.Body>
                                <Card.Title>${p.precio ? p.precio.toLocaleString('es-CL') : '0'}</Card.Title>
                                <Card.Text>{p.nombre}</Card.Text>
                                <Card.Text style={{ fontSize: 16 }}>{p.descripcion}</Card.Text>
                                <Button onClick={() => onAdd(p)}>+ Agregar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}