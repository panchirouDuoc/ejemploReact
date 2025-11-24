import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button, Image, Alert } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoActivo, setPedidoActivo] = useState(null);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth(); 

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!isAuthenticated || !user) {
        setError("No estás autenticado.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/pedidos/usuario/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar los pedidos.");
        }

        const data = await response.json();
        setPedidos(data);
        const ultimoPedido = data.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
                                 .find(p => p.estado !== 'ENTREGADO' && p.estado !== 'CANCELADO');
        setPedidoActivo(ultimoPedido || (data.length > 0 ? data[0] : null));
        setError("");

      } catch (err) {
        console.error("Error al obtener pedidos:", err);
        setError(err.message);
      }
    };

    fetchPedidos();
  }, [isAuthenticated, user]);

  
  const handleUpdateStatus = async (newStatus) => {
    if (!pedidoActivo) return;

    try {
      const response = await fetch(`http://localhost:8080/api/pedidos/${pedidoActivo.id}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ estado: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el estado a ${newStatus}.`);
      }

      const pedidoActualizado = await response.json();
      setPedidoActivo(pedidoActualizado);
      setPedidos(pedidos.map(p => p.id === pedidoActualizado.id ? pedidoActualizado : p));
      setError("");

    } catch (err) {
      console.error("Error al actualizar estado:", err);
      setError(err.message);
    }
  };

  // Funciones auxiliares (sin cambios)
  const formatCurrency = (value) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(value || 0);
  const formatDate = (iso) => new Date(iso).toLocaleString("es-CL");

  
  const statusToProgress = {
    PENDIENTE: { now: 20, label: "Pendiente" },
    PROCESANDO: { now: 40, label: "Procesando" },
    ENVIADO: { now: 75, label: "Enviado" },
    ENTREGADO: { now: 100, label: "Entregado" },
    CANCELADO: { now: 100, label: "Cancelado", variant: "danger" },
  };
  
  const estadoActual = pedidoActivo?.estado ?? 'PENDIENTE';
  const progressInfo = statusToProgress[estadoActual] || { now: 0, label: "Desconocido" };

  
  const productosList = (pedidoActivo?.items ?? []).map((p) => (
    <div key={p.id}>
      {p.nombreProducto} x{p.cantidad} ({formatCurrency(p.precio)})
    </div>
  ));

  return (
    <Container className="my-5">
      <h1>Seguimiento de Pedidos</h1>
      <div className="subtitle">Procesa y sigue el estado de tus pedidos</div>
      
      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

      <Row className="my-4">
        <Col md={8}>
          {pedidoActivo ? (
            <>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Boleta</Card.Title>
                  <div className="alert alert-info mt-3">
                    <strong>Boleta generada:</strong><br />
                    N°: {pedidoActivo.id}<br />
                    Fecha: {formatDate(pedidoActivo.fechaCreacion)}<br />
                    Estado: {pedidoActivo.estado}<br />
                    <hr />
                    <strong>Productos:</strong>
                    <div className="mt-2">{productosList.length ? productosList : <div>-</div>}</div><br />
                    <strong>Total: {formatCurrency(pedidoActivo.total)}</strong>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Estado del Pedido</Card.Title>
                  <div className="mb-3">Pedido {pedidoActivo.estado}.</div>
                  <ProgressBar
                    now={progressInfo.now}
                    label={progressInfo.label}
                    variant={progressInfo.variant || 'primary'}
                    style={{ height: "30px" }}
                    animated striped
                  />
                </Card.Body>
              </Card>

              
              <div className="d-flex gap-2">
                {estadoActual === "PENDIENTE" && (
                  <Button variant="primary" onClick={() => handleUpdateStatus('PROCESANDO')}>
                    Marcar como Procesando
                  </Button>
                )}
                {estadoActual === "PROCESANDO" && (
                  <Button variant="warning" onClick={() => handleUpdateStatus('ENVIADO')}>
                    Marcar como Enviado
                  </Button>
                )}
                {estadoActual === "ENVIADO" && (
                  <Button variant="success" onClick={() => handleUpdateStatus('ENTREGADO')}>
                    Marcar como Entregado
                  </Button>
                )}
              </div>
            </>
          ) : (
            <Alert variant="warning">No hay pedidos activos para mostrar.</Alert>
          )}
        </Col>

        <Col md={4}>
        
        </Col>
      </Row>
    </Container>
  );
}
