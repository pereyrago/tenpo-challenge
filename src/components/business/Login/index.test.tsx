import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "./index";
import { PASSWORD_ERROR_CASES } from "@/schemas/login";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("Login Page", () => {
  beforeEach(() => {
    render(<Login />);
  });
  describe("Los elementos se renderizan correctamente", () => {
    it("Input email", () => {
      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toBeInTheDocument();
    });

    it("Input password", () => {
      const passwordInput = screen.getByPlaceholderText("Contraseña");
      expect(passwordInput).toBeInTheDocument();
    });

    it("Botón de Login", () => {
      const submitButton = screen.getByRole("button", { name: "Entrar" });
      expect(submitButton).toBeInTheDocument();
    });
  });
  describe("Comprobación de casos", () => {
    it("Si no ingreso campo contraseña el botón estará desabilitado", async () => {
      const emailInput = screen.getByPlaceholderText("Email");
      const submitButton = screen.getByRole("button", { name: "Entrar" });
      await userEvent.type(emailInput, "test@mail.com");
      expect(submitButton).toBeDisabled();
    });
    it("Si no ingreso campo email el botón estará desabilitado", async () => {
      const passwordInput = screen.getByPlaceholderText("Contraseña");
      const submitButton = screen.getByRole("button", { name: "Entrar" });
      await userEvent.type(passwordInput, "W123456.");
      expect(submitButton).toBeDisabled();
    });
    it("Si ingreso ambos campos correctamente el botón estará habilitado y no habrá errores mostrados en pantalla", async () => {
      const emailInput = screen.getByPlaceholderText("Email");
      await userEvent.type(emailInput, "test@mail.com");

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      await userEvent.type(passwordInput, "Wa12345.");

      const submitButton = screen.getByRole("button", { name: "Entrar" });
      expect(submitButton).toBeEnabled();
      expect(
        screen.queryByText(PASSWORD_ERROR_CASES.length)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(PASSWORD_ERROR_CASES.minus)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(PASSWORD_ERROR_CASES.mayus)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(PASSWORD_ERROR_CASES.special)
      ).not.toBeInTheDocument();
    });
    it("Si ingreso mal la contraseña se mostrarán errores en pantalla", async () => {
      const emailInput = screen.getByPlaceholderText("Email");
      await userEvent.type(emailInput, "test@mail.com");

      const passwordInput = screen.getByPlaceholderText("Contraseña");
      await userEvent.type(passwordInput, "W45.");

      const submitButton = screen.getByRole("button", { name: "Entrar" });
      await userEvent.click(submitButton);
      expect(
        screen.queryByText(PASSWORD_ERROR_CASES.length)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(PASSWORD_ERROR_CASES.minus)
      ).toBeInTheDocument();
    });
  });
});
