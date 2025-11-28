import React from 'react'
import { Badge, Navbar, Container, Nav, NavDropdown, Image, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'


export default function AppNavbar({cart}) {
    const { user, logout } = useAuth()


    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <Image
                        src="/images/logo_circulo.png"
                        alt="logo"
                        style={{ maxWidth: 120, height: "auto", borderRadius: "100%" }}
                        className="me-2"
                    />
                    Huerto Hogar
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/carrito">
                        Carrito{" "}
                        <Badge bg="secondary">{cart ? cart.length:0}</Badge>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/Pedidos">Pedidos</Nav.Link>
                        <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
                        <NavDropdown title="Más" id="masDropdown">
                            <NavDropdown.Item as={NavLink} to="/formulario">
                                Contáctanos <span style={{ color: "#FFD700" }}>●</span>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/resenias">
                                Reseñas
                            </NavDropdown.Item>
                            {user?.rol === 'ROLE_ADMIN' &&(
                                <>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/admin">Panel Admin</NavDropdown.Item></>)}
                        </NavDropdown>
                    </Nav>
                    <Nav className="ms-auto mb-2 mb-lg-0">
                        <NavDropdown
                            title={
                                <>
                                    <Image
                                        src="/images/logo-perfil.jpg"
                                        alt="perfil"
                                        style={{ maxWidth: 30, height: "auto", borderRadius: "100%" }}
                                        className="me-1"
                                    />
                                    Perfil
                                </>
                            }
                            id="perfilDropdown"
                            align="end"
                        >
                            {user ? (
                                <>
                                    <NavDropdown.Item as={NavLink} to="/perfil">Mi perfil</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout} as={NavLink} to={"/login"}>Cerrar sesión</NavDropdown.Item>
                                         
                                </>
                            ) : (
                                <>
                                    <NavDropdown.Item as={NavLink} to="/login">Iniciar sesión</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/register">Registrarse</NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}