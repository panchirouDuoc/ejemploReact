import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Table, Image, Row, Col } from "react-bootstrap";

export default function Admin() {
  const STORAGE_KEY = "productos";
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: "",
    imagen: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProductos(JSON.parse(raw));
    } catch (err) {
      console.warn("Error cargando productos:", err);
    }
  }, []);

  const saveAll = (arr) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      setProductos(arr);
    } catch (err) {
      console.warn("No se pudo guardar productos:", err);
    }
  };

  const resetForm = () =>
    setForm({ id: "", nombre: "", precio: "", categoria: "", descripcion: "", imagen: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.nombre.trim() || !form.precio || !form.categoria) return;

    const precioNum = Number(form.precio);
    if (Number.isNaN(precioNum)) return;

    if (editing) {
      const updated = productos.map((p) =>
        p.id === form.id
          ? {
              ...p,
              nombre: form.nombre.trim(),
              precio: precioNum,
              categoria: form.categoria,
              descripcion: form.descripcion,
              imagen: form.imagen.trim(),
            }
          : p
      );
      saveAll(updated);
    } else {
      const nuevo = {
        id: Date.now().toString(),
        nombre: form.nombre.trim(),
        precio: precioNum,
        categoria: form.categoria,
        descripcion: form.descripcion,
        imagen: form.imagen.trim(),
      };
      saveAll([nuevo, ...productos]);
    }

    resetForm();
    setEditing(false);
  };

  const handleEdit = (id) => {
    const p = productos.find((x) => x.id === id);
    if (!p) return;
    setForm({
      id: p.id,
      nombre: p.nombre,
      precio: String(p.precio),
      categoria: p.categoria,
      descripcion: p.descripcion,
      imagen: p.imagen || "",
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    const filtered = productos.filter((p) => p.id !== id);
    saveAll(filtered);
    if (editing && form.id === id) {
      resetForm();
      setEditing(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditing(false);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Panel de Administración</h1>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{editing ? "Editar Producto" : "Agregar Producto"}</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Control type="hidden" value={form.id} />

                <Form.Group className="mb-2" controlId="producto-nombre">
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="producto-precio">
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="precio"
                    placeholder="Precio"
                    value={form.precio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="producto-categoria">
                  <Form.Select name="categoria" value={form.categoria} onChange={handleChange} required>
                    <option value="">Selecciona categoría</option>
                    <option value="frutas">Frutas</option>
                    <option value="verduras">Verduras</option>
                    <option value="organicos">Orgánicos</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2" controlId="producto-descripcion">
                  <Form.Control
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="producto-imagen">
                  <Form.Control
                    type="text"
                    name="imagen"
                    placeholder="URL de imagen (opcional)"
                    value={form.imagen}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="success">
                    {editing ? "Guardar cambios" : "Guardar"}
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleCancel} className={editing ? "" : "d-none"}>
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Perfil Administrador</Card.Title>
              <p>
                <strong>Nombre:</strong> Admin
              </p>
              <p>
                <strong>Correo:</strong> admin@huerto.cl
              </p>
              <div className="d-grid">
                <Button variant="link" href="/perfil">
                  Editar Perfil
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Card.Title>Lista de Productos</Card.Title>
          <Table responsive bordered hover className="align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No hay productos
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>${Number(p.precio).toLocaleString("es-CL")}</td>
                    <td>{p.categoria}</td>
                    <td style={{ maxWidth: 220 }}>{p.descripcion}</td>
                    <td style={{ width: 110 }}>
                      {p.imagen ? (
                        <Image src={p.imagen} alt={p.nombre} thumbnail style={{ maxWidth: 80, maxHeight: 60 }} />
                      ) : (
                        <div className="text-muted small">Sin imagen</div>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-primary" onClick={() => handleEdit(p.id)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}