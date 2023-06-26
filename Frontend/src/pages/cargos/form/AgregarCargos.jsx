import { useEffect, useState } from "react";
import { Col, Form, Button, Alert} from "react-bootstrap";

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
                    <Form.Control
                        type="text"
                        placeholder="Ingrese un cargo"
                        value={nombreCargo}
                        onChange={(e) => setNombreCargo(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formLastname" className="mb-3">
                    <Form.Label>Sueldo:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ingrese el sueldo"
                        value={sueldo}
                        onChange={(e) => setSueldo(e.target.value)}
                    />
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