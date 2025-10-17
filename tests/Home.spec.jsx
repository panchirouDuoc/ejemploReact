import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../src/pages/Home";

describe("Componente Home", () => {
it("renderiza el título correctamente", () => {
render(<Home />);
expect(screen.getByText("Huerto Hogar")).toBeInTheDocument();
});

it("contiene un párrafo descriptivo", () => {
render(<Home />);
expect(screen.getByText(/Productos frescos, naturales y sostenibles para tu hogar./i)).toBeInTheDocument();
});

it('muestra la imagen de "¿Quiénes somos?" con el src correcto', () => {
  render(<Home />);
  const logo = screen.getByAltText("Logo Huerto Hogar");
  expect(logo).toBeInTheDocument();
  expect(logo.src).toContain("logo_circulo.png");
});

it("muestra la sección Nuestras tiendas", () => {
render(<Home />);
expect(screen.getByText("Nuestras tiendas")).toBeInTheDocument();
expect(
screen.getByText(/Visítanos en nuestras nuevas ubicaciones/i)
).toBeInTheDocument();
});
});