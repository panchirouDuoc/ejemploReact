import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Carrito from "../src/pages/Carrito";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Carrito", () => {
  it("renderiza el título y mensaje de carrito vacío", () => {
    renderWithRouter(<Carrito items={[]} onRemove={() => {}} onClear={() => {}} />);
    expect(screen.getByText("Carrito")).toBeInTheDocument();
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  it('renderiza el botón "Eliminar" cuando hay items', () => {
    const items = [{ id: 1, nombre: "Manzana", precio: 1000 }];
    renderWithRouter(<Carrito items={items} onRemove={() => {}} onClear={() => {}} />);
    const botonesEliminar = screen.getAllByRole("button", { name: /Eliminar/i });
    expect(botonesEliminar.length).toBeGreaterThan(0);
  });

  it('al hacer clic en "Eliminar" llama a onRemove', () => {
    const items = [{ id: 1, nombre: "Manzana", precio: 1000 }];
    const mockOnRemove = vi.fn();
    renderWithRouter(<Carrito items={items} onRemove={mockOnRemove} onClear={() => {}} />);
    const boton = screen.getAllByRole("button", { name: /Eliminar/i })[0];
    fireEvent.click(boton);
    expect(mockOnRemove).toHaveBeenCalled();
    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  it('al hacer clic en "Vaciar" llama a onClear', () => {
    const items = [{ id: 1, nombre: "Manzana", precio: 1000 }];
    const mockOnClear = vi.fn();
    renderWithRouter(<Carrito items={items} onRemove={() => {}} onClear={mockOnClear} />);
    const vaciarBtn = screen.getByRole("button", { name: /Vaciar/i });
    fireEvent.click(vaciarBtn);
    expect(mockOnClear).toHaveBeenCalled();
  });
});