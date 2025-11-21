import React from "react";
import { render, screen } from "@testing-library/react";
import Blog from "../src/pages/Blog";

describe("Componente Blog", () => {
  it("renderiza el título principal y el subtítulo", () => {
    render(<Blog />);
    expect(screen.getByText("Blog Huerto Hogar")).toBeInTheDocument();
    expect(
      screen.getByText(/Noticias, consejos y novedades sobre tu huerto en casa./i)
    ).toBeInTheDocument();
  });

  it("renderiza todas las entradas del blog con sus títulos y botones", () => {
    render(<Blog />);

    expect(screen.getByText("Cómo iniciar tu primer huerto en casa")).toBeInTheDocument();
    expect(screen.getByText("Beneficios de consumir productos orgánicos")).toBeInTheDocument();
    expect(screen.getByText("Consejos para conservar frutas y verduras")).toBeInTheDocument();

    const readMoreButtons = screen.getAllByText("Leer más");
    expect(readMoreButtons).toHaveLength(3);
  });
});