import { Table, Container, Form, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
function TablaEmpleado({ listaEmpleados, eliminarEmpleado }) {
    return (
        <Container className="mx-auto">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Nombres</th>
                        <th className="text-center">Apellidos</th>
                        <th className="text-center">Telefono</th>
                        <th className="text-center">Cargo</th>
                        <th className="text-center">Placa - Vehiculo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaEmpleados.map((empleado, index) => {
                            return (
                                <tr key={empleado.empleado_id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{empleado.empleado_nombre}</td>
                                    <td className="text-center">{empleado.empleado_apellido}</td>
                                    <td className="text-center">{empleado.empleado_telefono}</td>
                                    <td className="text-center">{empleado.cargo}</td>
                                    <td className="text-center">{empleado.tbl_vehiculo_vehiculo}</td>
                                    <td className="text-center">
                                        <button className="btn btn-danger" onClick={() => eliminarEmpleado(empleado.empleado_id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default TablaEmpleado