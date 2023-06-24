import axios from "axios"
import { useEffect, useState } from "react"

function FormEmpleado({ fagregarEmpleado }) {

    let [empleados, setEmpleados] = useState([])
    let [cargos, setCargos] = useState([])
    let [vehiculos, setVehiculos] = useState([])
    let [titulo, setTitulo] = useState('Nuevo Empleado')
    let [pos, setPos] = useState(false)
    let [id, setId] = useState(0)
    let [nombre, setNombre] = useState('')
    let [apellido, setApellido] = useState('')
    let [telefono, setTelefono] = useState('')
    let [cargoId, setCargoId] = useState(0)
    let [vehiculoId, setVehiculoId] = useState(0)


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
    }, [])
    return (
        <>
        Formulario : <h1>{titulo}</h1>
        </>

    )
}

export default FormEmpleado