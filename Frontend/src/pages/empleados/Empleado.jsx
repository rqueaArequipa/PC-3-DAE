import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import './styleEmpleados.css'
import TablaEmpleado from "./tablas/TablaEmpleado";
import axios from "axios";
import { Row, Col, Container, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';
import AgregarEditarEmpleadoForm from "./AgregarEmpleado";

function Empleado() {
    const [empleados, setEmpleados] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('nombre');
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseEmpl = await axios.get('http://127.0.0.1:8000/api/empleado/')
                setEmpleados(responseEmpl.data)
                console.log(responseEmpl.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    {/* Search por nombre, apellido, cargo, placa de vehiculo */}
    const handleSearchCriteriaChange = (e) => {setSearchCriteria(e.target.value);};
    const handleSearchTermChange = (e) => {setSearchTerm(e.target.value);};
    const filteredEmpleados = empleados.filter((empleado) => {
        if (searchCriteria === 'nombre') {
            return empleado.empleado_nombre.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'apellidos') {
            return empleado.empleado_apellido.toLowerCase().includes(searchTerm.toLowerCase())
        }
    });
    {/* endSearch */}

    {/* Delete */}
    function eliminarEmpleado(cod) {
        const rpta = window.confirm("desea eliminar");
        if (rpta) {
            axios.delete('http://127.0.0.1:8000/api/empleado/' + cod)
                .then(response => {
                    var temp = empleados.filter((empleado) => empleado.empleado_id !== cod);
                    setEmpleados(temp);
                })
        }
    }
    {/*EndDelete */}

    {/* setId */}
    const editarEmpleado = (empleadoId) => {
        const empleado = empleados.find((empleado) => empleado.empleado_id === empleadoId);
        setEmpleadoSeleccionado(empleado);
    };
    {/*EndSetID */}

    const actualizarEmpleado = (empleadoId, datos) => {
        if (empleadoId) {
            axios
                .put(`http://127.0.0.1:8000/api/empleado/${empleadoId}/`, datos)
                .then((response) => {
                    const empleadoIndex = empleados.findIndex((empleado) => empleado.empleado_id === empleadoId);
                    const updatedEmpleados = [...empleados];
                    updatedEmpleados[empleadoIndex] = response.data;
                    setEmpleados(updatedEmpleados);
                    setEmpleadoSeleccionado(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .post("http://127.0.0.1:8000/api/empleado/", datos)
                .then((response) => {
                    setEmpleados([...empleados, response.data]);
                    setEmpleadoSeleccionado(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Layout>
            <div>
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

            {/*  Components ListEmpleado y AddEmpleado */}
            <Row className="justify-content-center">
                <TablaEmpleado listaempleados={filteredEmpleados} eliminarEmpleado={eliminarEmpleado} editarEmpleado={editarEmpleado} />
                <AgregarEditarEmpleadoForm empleado={empleadoSeleccionado}
                    onSubmit={actualizarEmpleado}
                    onCancel={() => setEmpleadoSeleccionado(null)} />
            </Row>
        </Layout>
    );
}

export default Empleado;
