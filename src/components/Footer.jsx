import React from 'react'
import { Image } from 'react-bootstrap'

export default function Footer() {
    return (
        <footer className="bg-dark py-3 mt-auto">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-12 text-center d-flex justify-content-center align-items-center flex-wrap">
                        <h5 className="my-2 me-4 text-white">Síguenos:</h5>
                        <a href="https://www.facebook.com" className="mx-3" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Image src="/images/logo-fb.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />
                        </a>
                        <a href="https://www.instagram.com" className="mx-3" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Image src="/images/logo-instagram.jpg" alt="Instagram" style={{ width: '24px', height: '24px' }} />
                        </a>
                        <a href="https://www.twitter.com" className="mx-3" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Image src="/images/logo-x.png" alt="Twitter" style={{ width: '24px', height: '24px' }} />
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