import Layout from "../components/Layout";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';



function Index() {
    return (
        <Layout>
            <Container className="py-5">
                <Row className="text-center">
                    <Col>
                        <h1 className="mb-4">Bienvenido a Movilidad Escolar</h1>
                        <p className="lead">
                            La solución para el transporte seguro y confiable de estudiantes.
                        </p>
                        <Button variant="primary" size="lg" className="mt-4">
                            Regístrate ahora
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Transporte confiable</Card.Title>
                                <Card.Text>
                                    Nuestro servicio de movilidad escolar cuenta con conductores
                                    capacitados y vehículos seguros para garantizar la tranquilidad
                                    de los padres y la comodidad de los estudiantes.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Rastreo en tiempo real</Card.Title>
                                <Card.Text>
                                    Utilizamos tecnología GPS para que los padres puedan monitorear
                                    la ubicación del transporte escolar en tiempo real y tener
                                    tranquilidad sobre el paradero de sus hijos.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Comunicación directa</Card.Title>
                                <Card.Text>
                                    Facilitamos la comunicación directa entre los padres, los
                                    conductores y el personal escolar para una coordinación
                                    eficiente y rápida en caso de cualquier eventualidad.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Index;