import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button, Image } from "react-bootstrap";

export default function Pedidos() {

  const [pedido, setPedido] = useState(null);
  const [status, setStatus] = useState("none");
  const [orderNumber, setOrderNumber] = useState(null);
  const [fechaConfirmacion, setFechaConfirmacion] = useState(null);

  useEffect(() => {

    try {
      const raw = localStorage.getItem("pedido");
      if (!raw) {
        setPedido(null);
        setStatus("none");
        return;
      }
      const parsed = JSON.parse(raw);
      setPedido(parsed);

      const s = parsed?.status ?? "confirmado";
      const map = {
        confirmado: "confirmado",
        preparado: "preparado",
        enviado: "enviado",
        entregado: "entregado",
      };
      setStatus(map[s] ?? "confirmado");


      const n = parsed?.numeroPedido ?? Math.floor(Math.random() * 1000000);
      setOrderNumber(n);


      setFechaConfirmacion(parsed?.fechaConfirmacion ?? new Date().toISOString());
    } catch (err) {
      console.error("Error parseando pedido desde localStorage", err);
      setPedido(null);
      setStatus("none");
    }
  }, []);


  const formatCurrency = (value) => {
    try {
      return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(value);
    } catch {
      return "$" + (value ?? 0);
    }
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("es-CL");
    } catch {
      return iso ?? "-";
    }
  };

  const statusToProgress = {
    none: { now: 0, label: "Sin iniciar" },
    confirmado: { now: 33, label: "Confirmado" },
    preparado: { now: 66, label: "En preparación" },
    enviado: { now: 90, label: "Enviado" },
    entregado: { now: 100, label: "Entregado" },
  };

  const saveStatus = (newStatus) => {
    setStatus(newStatus);

    try {
      if (!pedido) return;
      const copia = { ...pedido, status: newStatus };
      localStorage.setItem("pedido", JSON.stringify(copia));
      setPedido(copia);
    } catch (err) {
      console.warn("No se pudo guardar el estado en localStorage", err);
    }
  };

  const handlePreparar = () => saveStatus("preparado");
  const handleEnviar = () => saveStatus("enviado");
  const handleEntregar = () => saveStatus("entregado");


  const productosList = (pedido?.productos ?? []).map((p, i) => {
    const nombre = p?.nombre ?? "Producto";
    const cantidad = p?.cantidad ?? 1;
    const precio = p?.precio ?? 0;
    return (
      <div key={i}>
        {nombre} x{cantidad} ({formatCurrency(precio)})
      </div>
    );
  });

  const total = pedido?.total ?? (pedido?.productos ? pedido.productos.reduce((s, x) => s + ((x?.precio ?? 0) * (x?.cantidad ?? 1)), 0) : 0);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Seguimiento de Pedidos</h1>
          <div className="subtitle">Procesa y sigue el estado de tus pedidos</div>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Boleta</Card.Title>
              <div id="boleta" className="mt-3">
                {pedido ? (
                  <div className="alert alert-info">
                    <strong>Boleta generada:</strong>
                    <br />
                    N°: {orderNumber}
                    <br />
                    Fecha: {formatDate(fechaConfirmacion)}
                    <br />
                    Estado: {status}
                    <br />
                    <hr />
                    <strong>Datos de facturación:</strong>
                    <br />
                    Nombre: {pedido?.perfil?.nombre ?? "-"}
                    <br />
                    Correo: {pedido?.perfil?.correo ?? "-"}
                    <br />
                    Dirección: {pedido?.perfil?.direccion ?? "-"}
                    <br />
                    Teléfono: {pedido?.perfil?.telefono ?? "-"}
                    <br />
                    <hr />
                    <strong>Productos:</strong>
                    <div className="mt-2">{productosList.length ? productosList : <div>-</div>}</div>
                    <br />
                    <strong>Total: {formatCurrency(total)}</strong>
                  </div>
                ) : (
                  <div className="alert alert-warning">No hay pedido confirmado.</div>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Estado del Pedido</Card.Title>
              <div id="estadoPedido" className="mb-3">
                {pedido ? `Pedido ${status}.` : "Sin pedido confirmado."}
              </div>

              <label className="form-label">Rastreo de pedido:</label>
              <ProgressBar
                now={statusToProgress[status]?.now ?? 0}
                label={statusToProgress[status]?.label ?? ""}
                style={{ height: "30px" }}
                animated
                striped
              />
            </Card.Body>
          </Card>

          <div className="d-flex gap-2">
           
            {pedido && status === "confirmado" && (
              <Button id="prepararPedido" variant="primary" onClick={handlePreparar}>
                Preparar pedido
              </Button>
            )}
            {pedido && status === "preparado" && (
              <Button id="enviarPedido" variant="warning" onClick={handleEnviar}>
                Enviar pedido
              </Button>
            )}
            {pedido && status === "enviado" && (
              <Button id="entregarPedido" variant="success" onClick={handleEntregar}>
                Entregar pedido
              </Button>
            )}
            
            {pedido && status === "entregado" && (
              <Button variant="outline-secondary" onClick={() => {
                
                localStorage.removeItem("pedido");
                setPedido(null);
                setStatus("none");
              }}>
                Finalizar (limpiar)
              </Button>
            )}
          </div>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Image src="/images/logo_circulo.png" roundedCircle fluid style={{ maxWidth: 120 }} className="mb-3" />
              <Card.Title>Huerto Hogar</Card.Title>
              <Card.Text className="muted">Nuestro compromiso: entrega fresca y a tiempo</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}