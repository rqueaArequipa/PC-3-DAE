import { faClose, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Table } from "react-bootstrap"

function TablaCargos({ listaCargos, editarCargo, eliminarCargo, errorMessage, MessageError }) {
    return (
        
        <Col md={8}>
            <Table striped bordered hover style={{backgroundColor: '#fff'}}>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Cargo Nombre</th>
                        <th className="text-center">Sueldo</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCargos.map((cargo, index) => (
                        <tr key={cargo.cargo_id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{cargo.cargo_nombre}</td>
                            <td className="text-center">S/.{cargo.cargo_sueldo}</td>
                            <td className="text-center">
                                <div className='btn-group'>
                                    <button className="btn btn-primary" onClick={() => editarCargo(cargo.cargo_id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => eliminarCargo(cargo.cargo_id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {errorMessage && (
                <Col md={2}>
                    <div
                        className="position-fixed top-0 start-0 bottom-0 end-0 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        <div className="alert alert-danger text-center" role="alert">
                            <p>{errorMessage}</p>
                            <div className='btn-group mb-3'>
                                <button type="button" className="btn btn-danger" aria-label="Close" onClick={() => MessageError(null)}>
                                    <FontAwesomeIcon icon={faClose} /> Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            )}
        </Col>
    )
}

export default TablaCargos