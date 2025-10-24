import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'


export default function Register() {
    const { register, login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ nombre: '', apellido: '', username: '', correo: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validación del formato de correo electrónico
        if (!form.correo.includes('@') || !form.correo.includes('.')) {
            setError('Por favor, ingresa un correo electrónico válido.');
            return; // Detiene el envío si el correo no es válido
        }

        setLoading(true)
        try {
            await register(form)
            await login({ username: form.username, password: form.password })
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="p-3">
                        <Card.Body>
                            <Card.Title className="mb-3">Crear cuenta</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control name="nombre" value={form.nombre} onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control name="apellido" value={form.apellido} onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control name="username" value={form.username} onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control name="correo" value={form.correo} onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={form.password} onChange={onChange} required />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" disabled={loading}>{loading ? 'Creando…' : 'Crear cuenta'}</Button>
                                </div>
                            </Form>
                            <hr />
                            <p className="mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}