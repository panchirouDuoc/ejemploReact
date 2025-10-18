import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Image } from "react-bootstrap";

export default function Formulario() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values) => {
    const errs = {};
    if (!values.nombre || values.nombre.trim().length < 2) errs.nombre = "Nombre obligatorio";
    if (!values.email) errs.email = "Email obligatorio";
    else {
      // simple email check
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(values.email)) errs.email = "Email inválido";
    }
    if (!values.mensaje || values.mensaje.trim().length < 5) errs.mensaje = "Mensaje demasiado corto";
    return errs;
  };

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // guardar en localStorage como ejemplo
      try {
        const listaRaw = localStorage.getItem("contactos") || "[]";
        const lista = JSON.parse(listaRaw);
        lista.push({ ...form, fecha: new Date().toISOString() });
        localStorage.setItem("contactos", JSON.stringify(lista));
      } catch (err) {
        console.warn("No se pudo guardar en localStorage", err);
      }
      setSubmitted(true);
      setForm({ nombre: "", email: "", mensaje: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h1>Huerto Hogar</h1>
          <div className="subtitle">Productos frescos, naturales y sostenibles para tu hogar.</div>

          <Form noValidate onSubmit={handleSubmit} className="mt-4">
            {submitted && <Alert variant="success">Mensaje enviado. Gracias por contactarnos.</Alert>}

            <Form.Group className="mb-3 text-start" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                isInvalid={!!errors.nombre}
                placeholder="Tu nombre"
              />
              <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="tu@ejemplo.com"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="mensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                isInvalid={!!errors.mensaje}
                placeholder="Escribe tu mensaje..."
              />
              <Form.Control.Feedback type="invalid">{errors.mensaje}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Enviar</Button>
          </Form>
        </Col>

        <Col md={6} className="text-center">
          <Image src="/images/logo_circulo.png" alt="Logo Huerto Hogar" fluid style={{ maxWidth: 700 }} />
        </Col>
      </Row>
    </Container>
  );
}