import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Resenias from "../src/pages/resenias";

describe("Componente Reseñas", () => {
it("renderiza el título correctamente", () => {
render(<Resenias />);
expect(screen.getByText("Reseñas de Clientes")).toBeInTheDocument();
});


it("contiene un párrafo descriptivo", () => {
render(<Resenias />);
expect(screen.getByText(/Reseñas recientes/i)).toBeInTheDocument();
});

it('renderiza los botones "Enviar Reseña" ', () => {
    render(<Resenias/>);
    const botones = screen.getAllByRole("button", { name: /Enviar reseña/i });
    expect(botones.length).toBeGreaterThan(0);
  });

it('renderiza los botones "Limpiar" ', () => {
    render(<Resenias/>);
    const botones = screen.getAllByRole("button", { name: /Limpiar/i });
    expect(botones.length).toBeGreaterThan(0);
  });



});