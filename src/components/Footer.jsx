import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-dark py-3 mt-auto">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-12 text-center d-flex justify-content-center align-items-center flex-wrap">
                        <h5 className="my-2 me-4 text-white">Síguenos:</h5>
                        <a href="https://www.facebook.com" className="mx-3" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="text-primary bi bi-facebook" style={{ fontSize: 24 }}></i>
                        </a>
                        <a href="#" className="mx-3" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">
                            <i className="bi bi-whatsapp" style={{ fontSize: 24, color: "#25D366" }}></i>
                        </a>
                        <a href="#" className="mx-3" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="text-danger-emphasis bi bi-instagram" style={{ fontSize: 24, color: "#E4405F" }}></i>
                        </a>
                        <a href="mailto:tu_email@ejemplo.com" className="mx-3" aria-label="Correo electrónico">
                            <i className="fas fa-envelope fa-2x" style={{ fontSize: 24, color: "#FFD700" }}></i>
                        </a>
                    </div>
                </div>
                <hr className="my-2 text-white" />
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p className="small mb-0 text-white">
                            &copy; 2025 Huerto Hogar. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}