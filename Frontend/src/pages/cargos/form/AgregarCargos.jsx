import { useEffect, useState } from "react";
import { Col, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPhone, faUserTag, faDollarSign } from '@fortawesome/free-solid-svg-icons';

function AgregarEditarCargoForm({ cargo, onSubmit, onCancel }) {
    const [nombreCargo, setNombreCargo] = useState("")
    const [sueldo, setSueldo] = useState(0)
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (cargo) {
            setNombreCargo(cargo.cargo_nombre)
            setSueldo(cargo.cargo_sueldo)
        }
    }, [cargo])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombreCargo.trim() === "" || sueldo === 0) {
            setShowError(true);
            return;
        }

        const datos = {
            cargo_nombre: nombreCargo,
            cargo_sueldo: sueldo
        };

        setNombreCargo('');
        setSueldo(0);
        setShowError(false)
        onSubmit(cargo ? cargo.cargo_id : null, datos);
    };

    const handleFormCancel = () => {
        setNombreCargo('');
        setSueldo(0);
        setShowError(false);
        onCancel();
    };

    return (
        <Col md={4}>
            <h2>{cargo ? "Editar Cargo" : "Agregar Cargo"}</h2>
            {showError && <Alert variant="danger">Por favor rellene todos los campos</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Nombre Cargo:</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faUserTag} />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese un cargo"
                            value={nombreCargo}
                            onChange={(e) => setNombreCargo(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formLastname" className="mb-3">
                    <Form.Label>Sueldo:</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faDollarSign} />
                        </InputGroup.Text>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese el sueldo"
                            value={sueldo}
                            onChange={(e) => setSueldo(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="text-center">
                        <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                            {cargo ? "Actualizar" : "Agregar"}
                        </Button>
                        <Button variant="secondary" onClick={handleFormCancel}>
                            Cancelar
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </Col>
    )
}

export default AgregarEditarCargoForm;