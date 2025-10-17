import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Productos from "../src/pages/Productos";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Productos", () => {
  it("renderiza el título correctamente", () => {
    renderWithRouter(<Productos />);
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
  });

  it("contiene un párrafo descriptivo (coincidencia parcial)", () => {
    renderWithRouter(<Productos />);
    expect(screen.getByText(/Manzana Fuji Bolsa, 1 kg/i)).toBeInTheDocument();
  });

  it('renderiza los botones "+ Agregar" ', () => {
    renderWithRouter(<Productos onAdd={() => {}} />);
    const botones = screen.getAllByRole("button", { name: /\+?\s*Agregar/i });
    expect(botones.length).toBeGreaterThan(0);
  });

  it("al hacer clic en '+ Agregar'", () => {
    const mockOnAdd = vi.fn();
    renderWithRouter(<Productos onAdd={mockOnAdd} />);
    const boton = screen.getAllByRole("button", { name: /\+?\s*Agregar/i })[0];
    fireEvent.click(boton);
    expect(mockOnAdd).toHaveBeenCalled();
  });

});