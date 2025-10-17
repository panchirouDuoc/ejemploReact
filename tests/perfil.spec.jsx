import { vi } from "vitest";

// MOCK antes de importar el componente para evitar que se ejecuten efectos/llamadas reales
vi.mock("../src/auth/AuthContext", () => ({
  useAuth: () => ({
    user: {
      uid: "test-uid",
      nombre: "Usuario Prueba",
      correo: "prueba@example.com",
      direccion: "Calle Falsa 123",
      telefono: "+56912345678",
      photoURL: "/images/logo-perfil.jpg",
      displayName: "Usuario Prueba"
    },
    // si tu contexto exporta funciones, devuélvelas como mocks también
    login: vi.fn(),
    logout: vi.fn()
  })
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import Perfil from "../src/pages/perfil";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componentes perfil", () => {
  it("renderiza el título correctamente", () => {
    renderWithRouter(<Perfil />);
    expect(screen.getByText(/Mi Perfil/i)).toBeInTheDocument();
  });

  it('muestra la imagen de "Perfil predeterminada"', () => {
    renderWithRouter(<Perfil />);
    const logo = screen.getByAltText("Foto de perfil");
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain("logo-perfil.jpg");
  });

  it('renderiza la etiqueta "Cambiar Foto" y el input asociado', () => {
    renderWithRouter(<Perfil />);
    expect(screen.getByText(/Cambiar Foto/i)).toBeInTheDocument();
    const inputFile = screen.getByLabelText(/Cambiar Foto/i);
    expect(inputFile).toBeInTheDocument();
    expect(inputFile).toHaveAttribute("type", "file");
  });
});

