import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'

const listaProductos = [
    {
        id: 1,
        nombre: "Manzana Fuji Bolsa, 1 kg",
        precio: 1890,
        descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.",
        categoria: "frutas",
        imagen: "/images/manzana.avif"
    },
    {
        id: 2,
        nombre: "Naranja Valencia Pote, 300 g",
        precio: 2490,
        descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad",
        categoria: "frutas",
        imagen: "/images/naranja.avif"
    },
    {
        id: 3,
        nombre: "Platano Cavendish Granel",
        precio: 1990,
        descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.",
        categoria: "frutas",
        imagen: "/images/platano.avif"
    },
    {
        id: 4,
        nombre: "Zanahoria Organica Bolsa, 1 kg",
        precio: 1090,
        descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable",
        categoria: "verduras",
        imagen: "/images/zanahoria.avif"
    },
    {
        id: 5,
        nombre: "Espinacas Frescas Bolsa, 1 kg",
        precio: 1090,
        descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional",
        categoria: "verduras",
        imagen: "/images/espinaca.avif"
    },
    {
        id: 6,
        nombre: "Pimiento Verde, 1 Un",
        precio: 950,
        descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.",
        categoria: "verduras",
        imagen: "/images/pimientos.avif"
    },
    {
        id: 7,
        nombre: "Miel de Abeja Organica, 1 kg",
        precio: 10090,
        descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.",
        categoria: "organicos",
        imagen: "/images/miel.avif"
    },
    {
        id: 8,
        nombre: "Quinoa Organica",
        precio: 2550,
        descripcion: "Quinoa integral y orgánica, cultivada por agricultores locales. Rica en proteínas, fibra y nutrientes esenciales, perfecta para preparar comidas saludables y nutritivas de manera natural.",
        categoria: "organicos",
        imagen: "/images/quinua.avif"
    },
    {
        id: 9,
        nombre: "Leche Entera Caja, 1 L",
        precio: 1350,
        descripcion: "Leche fresca y orgánica, proveniente de vacas criadas en pasturas naturales. Rica en calcio y vitaminas, ideal para disfrutar de manera saludable en tus comidas y bebidas diarias.",
        categoria: "organicos",
        imagen: "/images/leche entera.avif"
    }
]

const categorias = [
    { value: "todos", label: "Todos" },
    { value: "frutas", label: "Frutas" },
    { value: "verduras", label: "Verduras" },
    { value: "organicos", label: "Orgánicos" }
]

export default function Productos({ onAdd }) {
    const [selectedCategory, setSelectedCategory] = useState("todos")
    const [filteredProducts, setFilteredProducts] = useState(listaProductos)

    const handleCategoryChange = (e) => {
        const value = e.target.value
        setSelectedCategory(value)
        if (value === "todos") {
            setFilteredProducts(listaProductos)
        } else {
            setFilteredProducts(listaProductos.filter(p => p.categoria === value))
        }
    }

    return (
        <Container>
            <h2 className="page-title">Productos</h2>
            <Row className="mb-4">
                <Col md={6} className="mx-auto">
                    <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                        {categorias.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                {filteredProducts.map(p => (
                    <Col md={4} key={p.id} className="mb-5">
                        <Card className="h-100">
                            <Card.Img variant="top" src={p.imagen} alt={p.nombre} />
                            <Card.Body>
                                <Card.Title>${p.precio.toLocaleString('es-CL')}</Card.Title>
                                <Card.Text>{p.nombre}</Card.Text>
                                <Card.Text style={{ fontSize: 9 }}>{p.descripcion}</Card.Text>
                                <Button onClick={() => onAdd(p)}>+ Agregar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}