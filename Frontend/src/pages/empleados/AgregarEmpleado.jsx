import { useEffect, useState } from "react"
import axios from "axios"
import { Form, Button, Container, Alert } from 'react-bootstrap';

function AgregarEmpleado({ onValueChange }) {


    let [empleados, setEmpleados] = useState([])
    let [cargos, setCargos] = useState([])
    let [vehiculos, setVehiculos] = useState([])
    let [titulo, setTitulo] = useState('Nuevo Empleado')
    let [id, setId] = useState(0)
    let [nombre, setNombre] = useState('')
    let [apellido, setApellido] = useState('')
    let [telefono, setTelefono] = useState('')
    let [cargoId, setCargoId] = useState(0)
    let [vehiculoId, setVehiculoId] = useState(0)
    let [showError, setShowError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseEmpl = await axios.get('http://127.0.0.1:8000/api/empleado/')
                let responseCargo = await axios.get('http://127.0.0.1:8000/api/cargo/')
                let responseVehiculos = await axios.get('http://127.0.0.1:8000/api/vehiculo/')
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
        let cod = id;
        let datos = {
            empleado_nombre: nombre,
            empleado_apellido: apellido,
            empleado_telefono: telefono,
            cargo: cargoId,
            tbl_vehiculo_vehiculo: vehiculoId
        }
        if (cod > 0) {
            /*axios.put('http://localhost:8000/serie/' + cod, datos)
                .then(res => {
                    let indx = pos;
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
                })*/
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
                        <option value="">Seleccionar Vehiculo Placa:</option>
                        {Array.isArray(cargos) &&
                            cargos.map((option) => (
                                <option key={option.cargo_id} value={option.cargo_id}>
                                    {option.cargo_nombre}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Seleccione una opción:</Form.Label>
                    <Form.Control
                        as="select"
                        value={vehiculoId}
                        onChange={(e) => setVehiculoId(e.target.value)}
                    >
                        <option value="">Seleccionar opción</option>
                        {Array.isArray(vehiculos) &&
                            vehiculos.map((option) => (
                                <option key={option.vehiculo_id} value={option.vehiculo_id}>
                                    {option.vehiculo_placa}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>
                {showError && <Alert variant="danger">Por favor, complete todos los campos requeridos.</Alert>}
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

export default AgregarEmpleado