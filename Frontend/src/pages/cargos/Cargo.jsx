import { Alert, Row } from "react-bootstrap"
import Layout from "../../components/Layout"
import TablaCargos from "./table/TablaCargos"
import { useEffect, useState } from "react"
import axios from "axios"
import AgregarEditarCargoForm from "./form/AgregarCargos"

function Cargos() {

    const apiUrlCargos = 'http://127.0.0.1:8000/api/cargo/'
    const [cargos, setCargos] = useState([])
    const [cargoSeleccionado, setCargoSeleccionado] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCargos = await axios.get(apiUrlCargos)
                setCargos(responseCargos.data)
                console.log(responseCargos.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    function eliminarCargo(cod) {

        try {
            const rpta = window.confirm("¿Desea eliminar?");
            if (rpta) {
                axios
                    .delete(`${apiUrlCargos}${cod}/`)
                    .then(response => {
                        var temp = cargos.filter(cargo => cargo.cargo_id !== cod);
                        setCargos(temp);
                    })
                    .catch(err => {
                        setError("Ocurrió un error al eliminar el cargo. Por favor, inténtalo de nuevo más tarde.");
                    });
            }
        } catch (error) {
        }
    }


    const editarCargo = (cargoId) => {
        const cargo = cargos.find((cargo) => cargo.cargo_id === cargoId);
        setCargoSeleccionado(cargo);
    };

    const actualizarCargo = (cargoId, datos) => {
        if (cargoId) {
            axios
                .put(`${apiUrlCargos} +${cargoId}/`, datos)
                .then((response) => {
                    const cargoIndex = cargos.findIndex((cargo) => cargo.cargo_id === cargoId);
                    const updatedCargos = [...cargos];
                    updatedCargos[cargoIndex] = response.data;
                    setCargos(updatedCargos);
                    setCargoSeleccionado(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .post(apiUrlCargos, datos)
                .then((response) => {
                    setCargos([...cargos, response.data]);
                    setCargoSeleccionado(null);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const MessageError = (MessagError) => {
        setError(MessagError)
    };

    return (
        <Layout>
            <h1>Cargos</h1>
            <Row className="justify-content-center">
                <TablaCargos listaCargos={cargos} editarCargo={editarCargo} eliminarCargo={eliminarCargo}  errorMessage={error} MessageError={MessageError} />
                <AgregarEditarCargoForm cargo={cargoSeleccionado}
                    onSubmit={actualizarCargo}
                    onCancel={() => setCargoSeleccionado(null)} />
            </Row>
        </Layout>
    )

}

export default Cargos