import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import './styleEmpleados.css'
import TablaEmpleado from "./tablas/TablaEmpleado";
import axios from "axios";
import { Row, Col, Container, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import AgregarEmpleado from "./AgregarEmpleado";
import { Breadcrumb } from 'react-bootstrap';

function Empleado() {

    let [empleados, setEmpleados] = useState([])
    let [pos, setPos] = useState("not")
    let [searchTerm, setSearchTerm] = useState('');
    let [searchCriteria, setSearchCriteria] = useState('nombre');

    const handleSetValue = (newValue) => {
        setPos(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseEmpl = await axios.get('http://127.0.0.1:8000/api/empleado/')
                setEmpleados(responseEmpl.data)
                console.log(responseEmpl.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        setPos("Not")
    }, [pos])


    const handleSearchCriteriaChange = (e) => {
        setSearchCriteria(e.target.value);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEmpleados = empleados.filter((empleado) => {
        if (searchCriteria === 'nombre') {
            return empleado.empleado_nombre.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'apellidos') {
            return empleado.empleado_apellido.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'cargo') {
            return empleado.cargo.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'placaVehiculo') {
            return empleado.tbl_vehiculo_vehiculo.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    function eliminarEmpleado(cod) {
        let rpta = window.confirm("desea eliminar");
        if (rpta) {
            axios.delete('http://127.0.0.1:8000/api/empleado/' + cod)
                .then(response => {
                    var temp = empleados.filter((empleado) => empleado.empleado_id !== cod);
                    setEmpleados(temp);
                })
        }
    }

    return (
        <Layout>
            <div className="pagetitle" style={{ marginTop: '20px', marginLeft: '20px' }}>
                <h1>Tabla Empleados</h1>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item active>Empleados</Breadcrumb.Item>
                </Breadcrumb>
                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Buscar por:</Form.Label>
                        <Form.Control as="select" value={searchCriteria} onChange={handleSearchCriteriaChange}>
                            <option value="nombre">Nombre</option>
                            <option value="apellidos">Apellidos</option>
                            <option value="cargo">Cargo</option>
                            <option value="placaVehiculo">Placa Vehículo</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Buscar:</Form.Label>
                        <InputGroup>
                            <FormControl type="text" value={searchTerm} onChange={handleSearchTermChange} />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </div>
            <Row className="justify-content-center">
                <Col md={8}>
                    <TablaEmpleado listaEmpleados={filteredEmpleados} eliminarEmpleado={eliminarEmpleado} />
                </Col>
                <Col md={4}>
                    <AgregarEmpleado onValueChange={handleSetValue} />
                </Col>
            </Row>
        </Layout>
    );
}

export default Empleado;
