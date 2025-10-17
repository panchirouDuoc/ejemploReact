import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap'
import { useAuth } from '../auth/AuthContext'

export default function Perfil() {
    const { user } = useAuth()
    const [foto, setFoto] = useState('/images/logo-perfil.jpg')
    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        direccion: '',
        telefono: ''
    })


    useEffect(() => {
        if (user) {
            setForm({
                nombre: user.nombre || '',
                correo: user.correo || '',
                direccion: user.direccion || '',
                telefono: user.telefono || ''
            })
        }
    }, [user])

    const handleFotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (ev) => setFoto(ev.target.result)
            reader.readAsDataURL(file)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Cambios guardados (simulado)')
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Mi Perfil</h1>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="p-4">
                        <div className="text-center mb-4">
                            <Image
                                src={foto}
                                alt="Foto de perfil"
                                roundedCircle
                                className="shadow"
                                style={{ width: 150, height: 150, objectFit: 'cover' }}
                            />
                            <div className="mt-2">
                                <Form.Label htmlFor="fotoPerfil" className="btn btn-outline-success btn-sm mb-0">
                                    Cambiar Foto
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    id="fotoPerfil"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={handleFotoChange}
                                />
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user"
                                    value={form.user}
                                    onChange={handleChange}
                                    placeholder="jijijaja"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    placeholder="Ej: Rodrigo Lopez"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellido"
                                    value={form.apellido}
                                    onChange={handleChange}
                                    placeholder="lorca"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="correo"
                                    value={form.correo}
                                    onChange={handleChange}
                                    placeholder="Ej: usuario@email.com"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Dirección de Entrega</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    value={form.direccion}
                                    onChange={handleChange}
                                    placeholder="Ej: Calle Falsa 123, Santiago"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de Contacto</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="telefono"
                                    value={form.telefono}
                                    onChange={handleChange}
                                    placeholder="+569 XXXX XXXX"
                                />
                            </Form.Group>
                            <div className="d-grid">
                                <Button type="submit" variant="success">Guardar Cambios</Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}