import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert, Col } from "react-bootstrap";

function AgregarEditarEmpleadoForm({ empleado, onSubmit, onCancel }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [cargos, setCargos] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [cargoId, setCargoId] = useState(0)
    const [vehiculoId, setVehiculoId] = useState(0)
    const [showError, setShowError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCargo = await axios.get("http://127.0.0.1:8000/api/cargo/");
                const responseVehiculos = await axios.get("http://127.0.0.1:8000/api/vehiculo/");
                setCargos(responseCargo.data);
                setVehiculos(responseVehiculos.data);
            } catch (error) {
                console.log(error);

            }
        };

        fetchData();

        if (empleado) {
            setNombre(empleado.empleado_nombre);
            setApellido(empleado.empleado_apellido);
            setTelefono(empleado.empleado_telefono);
            setCargoId(empleado.cargo);
            setVehiculoId(empleado.tbl_vehiculo_vehiculo)
        }
    }, [empleado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || apellido.trim() === "" || telefono.trim() === "") {
            setShowError(true);
            return;
        }

        const datos = {
            empleado_nombre: nombre,
            empleado_apellido: apellido,
            empleado_telefono: telefono,
            cargo: cargoId,
            tbl_vehiculo_vehiculo: vehiculoId
        };

        setNombre('')
        setApellido('')
        setTelefono('')
        setCargoId(0)
        setVehiculoId(0)
        setShowError(false)
        onSubmit(empleado ? empleado.empleado_id : null, datos);
    };

    const handleFormCancel = () => {
        setNombre('')
        setApellido('')
        setTelefono('')
        setCargoId(0)
        setVehiculoId(0)
        setShowError(false)
        onCancel();
    };

    return (
        <Col md={4}>
            <Container>
                <h2>{empleado ? "Editar Empleado" : "Agregar Empleado"}</h2>
                {showError && <Alert variant="danger">Por favor rellene todos los campos</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Nombres:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese su nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formLastname">
                        <Form.Label>Apellidos:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa sus apellidos"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Telefono: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese su telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Seleccionar el Cargo:</Form.Label>
                        <Form.Control as="select" value={cargoId} onChange={(e) => setCargoId(e.target.value)}>
                            <option value="">Seleccionar un cargo</option>
                            {Array.isArray(cargos) &&
                                cargos.map((option) => (
                                    <option key={option.cargo_id} value={option.cargo_id}>
                                        {option.cargo_nombre}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Seleccione el vehiculo:</Form.Label>
                        <Form.Control as="select" value={vehiculoId} onChange={(e) => setVehiculoId(e.target.value)}>
                            <option value="">Seleccionar una placa de vehiculo</option>
                            {Array.isArray(vehiculos) &&
                                vehiculos.map((option) => (
                                    <option key={option.vehiculo_id} value={option.vehiculo_id}>
                                        {option.vehiculo_placa}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                                {empleado ? "Actualizar" : "Agregar"}
                            </Button>
                            <Button variant="secondary" onClick={handleFormCancel}>
                                Cancelar
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Container>
        </Col>
    );
}

export default AgregarEditarEmpleadoForm;

{/*import { useEffect, useState } from "react"
import axios from "axios"
import { Form, Button, Container, Alert } from 'react-bootstrap';

function AgregarEmpleado({ onValueChange }) {


    const [empleados, setEmpleados] = useState([])
    const [cargos, setCargos] = useState([])
    const [vehiculos, setVehiculos] = useState([])
    const [titulo, setTitulo] = useState('Nuevo Empleado')
    const [id, setId] = useState(0)
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [cargoId, setCargoId] = useState(0)
    const [vehiculoId, setVehiculoId] = useState(0)
    const [showError, setShowError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseEmpl = await axios.get('http://127.0.0.1:8000/api/empleado/')
                const responseCargo = await axios.get('http://127.0.0.1:8000/api/cargo/')
                const responseVehiculos = await axios.get('http://127.0.0.1:8000/api/vehiculo/')
                setCargos(responseCargo.data)
                setVehiculos(responseVehiculos.data)
                setEmpleados(responseEmpl.data)
                console.log(responseCargo.data)
                console.log(responseVehiculos.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        setShowError(false)
    }, [])

    function AgregarEmpleado(e) {
        e.preventDefault();

        if (nombre.trim() === '' || apellido.trim() === '' || telefono.trim() === '' || cargoId.trim() === '' || vehiculoId.trim() === '')  {
            setShowError(true);
            return;
        }else{
            setShowError(false)
        }
        const cod = id;
        const datos = {
            empleado_nombre: nombre,
            empleado_apellido: apellido,
            empleado_telefono: telefono,
            cargo: cargoId,
            tbl_vehiculo_vehiculo: vehiculoId
        }
        if (cod > 0) {
            /*axios.put('http://localhost:8000/serie/' + cod, datos)
                .then(res => {
                    const indx = pos;
                    series[indx] = res.data;
                    var temp = series;
                    setPos(null);
                    setTitulo('Nuevo');
                    setId(0);
                    setNombre('');
                    setFecha('');
                    setRating(0);
                    setCategoria('');
                    setSeries(temp);
                }).catch((error) => {

                    console.log(error.toString());
                })
        }
        else {
            axios.post('http://127.0.0.1:8000/api/empleado/', datos)
                .then(response => {
                    var temp = empleados;
                    temp.push(response.data);
                    onValueChange("yes")
                    setId(0);
                    setNombre('');
                    setApellido('');
                    setTelefono('');
                    setCargoId(0);
                    setVehiculoId(0);
                    setEmpleados(temp);
                }).catch((error) => {
                    console.log(error.toString());
                })
        }
    }
    return (
        <Container>
            <h2>{titulo}</h2>
            <Form onSubmit={AgregarEmpleado}>
                <Form.Control type="hidden" value={id} />
                <Form.Group controlId="formName">
                    <Form.Label>Nombres:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formLastname">
                    <Form.Label>Apellidos:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa sus apellidos"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formName">
                    <Form.Label>Telefono: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Seleccionar el Cargo:</Form.Label>
                    <Form.Control
                        as="select"
                        value={cargoId}
                        onChange={(e) => setCargoId(e.target.value)}
                    >
                        <option value="">Seleccionar un cargo:</option>
                        {Array.isArray(cargos) &&
                            cargos.map((option) => (
                                <option key={option.cargo_id} value={option.cargo_id}>
                                    {option.cargo_nombre}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Seleccione el vehiculo:</Form.Label>
                    <Form.Control
                        as="select"
                        value={vehiculoId}
                        onChange={(e) => setVehiculoId(e.target.value)}
                    >
                        <option value="">Seleccionar una placa de vehiculo</option>
                        {Array.isArray(vehiculos) &&
                            vehiculos.map((option) => (
                                <option key={option.vehiculo_id} value={option.vehiculo_id}>
                                    {option.vehiculo_placa}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>
                {showError && <Alert variant="danger">Por favor, compconste todos los campos requeridos.</Alert>}
                <Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </Container >
    )
}

export default AgregarEmpleado*/}