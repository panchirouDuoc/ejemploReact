import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={3}>
          <h2 className="page-title mb-4">Panel</h2>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin/productos">
              Gestionar Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/categorias">
              Gestionar Categorías
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/pedidos" disabled>
              Gestionar Pedidos
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/usuarios" disabled>
              Gestionar Usuarios
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}