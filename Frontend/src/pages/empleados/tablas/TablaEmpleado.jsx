import { Table, Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

function TablaEmpleado({listaempleados, eliminarEmpleado, editarEmpleado }) {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
            const fetchRelationalData = async () => {
                const empleadosWithRelationalData = await Promise.all(
                    listaempleados.map(async empleado => {
                        const cargoResponse = await axios.get(`http://127.0.0.1:8000/api/cargo/${empleado.cargo}`);
                        const vehiculoResponse = await axios.get(`http://127.0.0.1:8000/api/vehiculo/${empleado.tbl_vehiculo_vehiculo}`);
                        const cargoNombre = cargoResponse.data.cargo_nombre;
                        const vehiculoPlaca = vehiculoResponse.data.vehiculo_placa;
                        return { ...empleado, cargoNombre, vehiculoPlaca };
                    })
                );
                setEmpleados(empleadosWithRelationalData);
            };

            fetchRelationalData();
    }, [listaempleados]);

    return (
        <Col md={8}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Nombres</th>
                        <th className="text-center">Apellidos</th>
                        <th className="text-center">Teléfono</th>
                        <th className="text-center">Cargo</th>
                        <th className="text-center">Placa - Vehículo</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado, index) => (
                        <tr key={empleado.empleado_id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{empleado.empleado_nombre}</td>
                            <td className="text-center">{empleado.empleado_apellido}</td>
                            <td className="text-center">{empleado.empleado_telefono}</td>
                            <td className="text-center">{empleado.cargoNombre}</td>
                            <td className="text-center">{empleado.vehiculoPlaca}</td>
                            <td className="text-center">
                                <div className='btn-group'>
                                    <button className="btn btn-primary" onClick={() => editarEmpleado(empleado.empleado_id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => eliminarEmpleado(empleado.empleado_id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    );
}

export default TablaEmpleado;
