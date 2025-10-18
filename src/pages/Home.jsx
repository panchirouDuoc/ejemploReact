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
                <Col md={12}>
                    <Carousel className="my-4" style={{ maxWidth: '100%', margin: "auto" }}>
                        <Carousel.Item>
                            <div style={{ width: '100%', height: '500px', position: 'relative', overflow: 'hidden' }}>
                                <img
                                className="d-block w-100"
                                src="/images/banner3.jpg"
                                alt="Nuestras tiendas"
                                style={{ maxWidth: 2000, margin: "auto", maxHeight: 400, borderRadius: "100px" }}
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ width: '100%', height: '500px', position: 'relative', overflow: 'hidden' }}>
                                <img
                                    className="d-block w-100"
                                    src="/images/banner2.jpg"
                                    alt="ofertas"
                                    style={{ maxWidth: 2000, margin: "auto", maxHeight: 400, borderRadius: "100px" }}
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ width: '100%', height: '500px', position: 'relative', overflow: 'hidden' }}>
                                <img
                                    className="d-block w-100"
                                    src="/images/banner.jpg"
                                    alt="huertoPUNTOS"
                                    style={{ maxWidth: 2000, margin: "auto", maxHeight: 400, borderRadius: "100px" }}
                                />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Container className="my-5">
                <Row className="text-center">
                    <Col md={6} className="mb-4">
                        <div style={{ background: "transparent", display: "inline-block", padding: 10 }}>
                            <h3>Envios a todo Chile</h3>
                        <p>
                            Realizamos envíos a todo Chile, asegurando que tus productos lleguen frescos y en perfectas condiciones, sin importar dónde te encuentres.
                        </p>
                            <Image
                                src="/images/envios.png"
                                className="shadow mb-3"
                                alt="Logo Huerto Hogar"
                                fluid
                                style={{ maxHeight: 500, background: "transparent", borderRadius: "10%" }}
                            />
                        </div>
                        
                    </Col>
                    <Col md={6} className="mb-4">
                        <div style={{ background: "transparent", display: "inline-block", padding: 10 }}>
                            <h3>Huerto Puntos</h3>
                        <p>
                            Únete a nuestro programa de fidelidad Huerto puntos y acumula puntos con cada compra para canjearlos por descuentos exclusivos y ofertas especiales.
                        </p>
                            <Image
                                src="/images/puntos.png"
                                className="shadow mb-3"
                                alt="Logo Huerto Hogar"
                                fluid
                                style={{ maxHeight: 500, background: "transparent", borderRadius: "10%" }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="my-5">
                <Row className="text-center align-items-end">
                
                    <Col md={6} className="mb-4">
                        <div style={{ background: "#ffffffff", display: "inline-block", borderRadius: "100%", padding: 10 }}>
                            <Image
                                src="/images/logo_circulo.png"
                                className="shadow mb-3"
                                alt="Logo Huerto Hogar"
                                fluid
                                style={{ maxHeight: 500, borderRadius: "1000%" }}
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
                            style={{ maxHeight: 500, background: "transparent", borderRadius: "20%" }}
                        />
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}