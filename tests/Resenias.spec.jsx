import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Resenias from "../src/pages/resenias";

describe("Componente Resenias", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza el título y el formulario correctamente", () => {
    render(<Resenias />);
    expect(screen.getByText("Reseñas de Clientes")).toBeInTheDocument();
    expect(screen.getByText("Deja tu reseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Tu nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Comentario")).toBeInTheDocument();
    expect(screen.getByLabelText("Calificación")).toBeInTheDocument();
  });

  it("muestra un mensaje cuando no hay reseñas", () => {
    render(<Resenias />);
    expect(screen.getByText(/Aún no hay reseñas. Sé el primero en opinar./i)).toBeInTheDocument();
  });

  it("permite al usuario enviar una nueva reseña", async () => {
    render(<Resenias />);

 
    fireEvent.change(screen.getByLabelText("Tu nombre"), { target: { value: "Juan peres" } });
    fireEvent.change(screen.getByLabelText("Comentario"), { target: { value: "Excelentes productos!" } });
    fireEvent.change(screen.getByLabelText("Calificación"), { target: { value: "5" } });


    fireEvent.click(screen.getByText("Enviar reseña"));

    await waitFor(() => {
      expect(screen.getByText("Reseña enviada. ¡Gracias!")).toBeInTheDocument();
    });

  
    await waitFor(() => {
      expect(screen.getByText("Juan peres")).toBeInTheDocument();
      expect(screen.getByText("Excelentes productos!")).toBeInTheDocument();
      expect(screen.getByText("★★★★★")).toBeInTheDocument();
    });
  });
});