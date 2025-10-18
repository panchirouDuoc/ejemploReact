import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const posts = [
  {
    id: 1,
    title: "Cómo iniciar tu primer huerto en casa",
    excerpt:
      "Descubre los pasos básicos para comenzar tu propio huerto urbano, desde la elección de las plantas hasta el cuidado diario.",
  },
  {
    id: 2,
    title: "Beneficios de consumir productos orgánicos",
    excerpt:
      "Conoce por qué los productos orgánicos son mejores para tu salud y el medio ambiente.",
  },
  {
    id: 3,
    title: "Consejos para conservar frutas y verduras",
    excerpt:
      "Prácticas sencillas para mantener tus productos frescos por más tiempo y reducir desperdicios.",
  },
];

export default function Blog() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center" style={{ fontFamily: "'Playfair Display', serif", color: "#8B4513" }}>
            Blog Huerto Hogar
          </h1>
          <div className="subtitle text-center mb-4" style={{ color: "#666" }}>
            Noticias, consejos y novedades sobre tu huerto en casa.
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {posts.map((post) => (
          <Col md={12} lg={6} key={post.id}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.excerpt}</Card.Text>
                <Button variant="outline-success" size="sm">
                  Leer más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}