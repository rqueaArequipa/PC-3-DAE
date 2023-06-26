import Layout from "../components/Layout"
import { Spinner } from "react-bootstrap"

function LoadingPage() {
    return (
        <Layout>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <Spinner animation="border" role="status" variant="primary" className="mb-3">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                    <h3 className="fw-bold">Cargando</h3>
                    <p className="text-muted">Por favor, espera un momento</p>
                </div>
            </div>
        </Layout>
    )
}

export default LoadingPage