import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, Alert } from "react-bootstrap";

export default function Resenias() {
  const STORAGE_KEY = "resenias";
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ nombre: "", comentario: "", estrellas: "" });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReviews(JSON.parse(raw));
    } catch (err) {
      console.warn("No se pudo leer reseñas desde localStorage", err);
    }
  }, []);

  const validate = (values) => {
    const e = {};
    if (!values.nombre || values.nombre.trim().length < 2) e.nombre = "Nombre obligatorio";
    if (!values.comentario || values.comentario.trim().length < 3) e.comentario = "Comentario demasiado corto";
    if (!values.estrellas) e.estrellas = "Selecciona una calificación";
    return e;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    const nueva = {
      id: Date.now(),
      nombre: form.nombre.trim(),
      comentario: form.comentario.trim(),
      estrellas: Number(form.estrellas),
      fecha: new Date().toISOString(),
    };

    const updated = [nueva, ...reviews];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setReviews(updated);
      setForm({ nombre: "", comentario: "", estrellas: "" });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.warn("No se pudo guardar la reseña", err);
    }
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" });
    } catch {
      return iso;
    }
  };

  const renderStars = (n) => "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center navbar-brand">Reseñas de Clientes</h1>
        </Col>
      </Row>

      <Row className="my-3">
        <Col md={6}>
          <Card className="shadow p-3">
            <Card.Body>
              <Card.Title>Deja tu reseña</Card.Title>
              {saved && <Alert variant="success">Reseña enviada. ¡Gracias!</Alert>}
              <Form id="reviewForm" onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Tu nombre</Form.Label>
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

                <Form.Group className="mb-3" controlId="comentario">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comentario"
                    value={form.comentario}
                    onChange={handleChange}
                    isInvalid={!!errors.comentario}
                    placeholder="Escribe tu opinión..."
                  />
                  <Form.Control.Feedback type="invalid">{errors.comentario}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="estrellas">
                  <Form.Label>Calificación</Form.Label>
                  <Form.Select
                    name="estrellas"
                    value={form.estrellas}
                    onChange={handleChange}
                    isInvalid={!!errors.estrellas}
                  >
                    <option value="">Selecciona estrellas</option>
                    <option value="1">1 — ⭐</option>
                    <option value="2">2 — ⭐⭐</option>
                    <option value="3">3 — ⭐⭐⭐</option>
                    <option value="4">4 — ⭐⭐⭐⭐</option>
                    <option value="5">5 — ⭐⭐⭐⭐⭐</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.estrellas}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit">Enviar reseña</Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setForm({ nombre: "", comentario: "", estrellas: "" });
                      setErrors({});
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h3 className="mb-3">Reseñas recientes</h3>
          <ListGroup id="reviewsList">
            {reviews.length === 0 && (
              <ListGroup.Item className="text-muted">Aún no hay reseñas. Sé el primero en opinar.</ListGroup.Item>
            )}
            {reviews.map((r) => (
              <ListGroup.Item key={r.id} className="mb-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{r.nombre}</strong>
                    <div className="text-muted small">{formatDate(r.fecha)}</div>
                  </div>
                  <Badge bg="warning" text="dark" style={{ fontSize: 14 }}>
                    {renderStars(r.estrellas)}
                  </Badge>
                </div>
                <div className="mt-2">{r.comentario}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}