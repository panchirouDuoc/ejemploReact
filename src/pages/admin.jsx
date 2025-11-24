import React from "react";
import { Container, Row, Col, Nav, Card } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";

function AdminHome() {
  return (
    <Card body>Bienvenido al panel de administración. Selecciona una opción del menú para comenzar.</Card>
  );
}

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
          {useLocation().pathname === "/admin" ? <AdminHome /> : <Outlet />}
        </Col>
      </Row>
    </Container>
  );
}