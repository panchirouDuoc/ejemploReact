import React from 'react'
import { Container, Row, Col, Carousel, Image } from 'react-bootstrap'


export default function Home() {
    return (
        <Container className="my-5 text-center">
            <Row>
                <Col>
                    <h1 className='home-title'>Huerto Hogar</h1>
                    <div className="subtitle">
                        Productos frescos, naturales y sostenibles para tu hogar.
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Carousel className="my-4" style={{ maxWidth: 600, margin: "auto" }}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/images/envios.png"
                                alt="Nuestras tiendas"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/images/ofertas.png"
                                alt="ofertas"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/images/puntos.png"
                                alt="huertoPUNTOS"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Container className="my-5">
                <Row className="text-center align-items-end">
                    <Col md={6} className="mb-4">
                        <div style={{ background: "#f3f3f3", display: "inline-block", borderRadius: "100%", padding: 10 }}>
                            <Image
                                src="/images/logo_circulo.png"
                                className="shadow mb-3"
                                alt="Logo Huerto Hogar"
                                fluid
                                style={{ maxHeight: 500, borderRadius: "1000%", background: "transparent" }}
                            />
                        </div>
                        <h3>¿Quiénes somos?</h3>
                        <p>
                            Somos Huerto Hogar, una empresa dedicada a ofrecer productos frescos, naturales y sostenibles directamente a tu hogar. Nuestro compromiso es con la calidad, el medio ambiente y la comunidad.
                        </p>
                    </Col>
                    <Col md={6} className="mb-4">
                        <h3>Nuestras tiendas</h3>
                        <p>
                            Visítanos en nuestras nuevas ubicaciones:<br />
                            <strong>Santiago, Puerto Montt, Villarica, Nacimiento, Viña del Mar, Valparaíso, Concepción</strong>
                        </p>
                        <Image
                            src="/images/ciudades.png"
                            className="rounded shadow mb-3"
                            alt="Nuestras tiendas"
                            fluid
                            style={{ maxHeight: 500, borderRadius: "50%" }}
                        />
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}