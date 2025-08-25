import { Persons } from "@/schemas/persons";
import { api } from "./api";
import { API_PATHS } from "@/constants/paths";
import { AxiosError } from "axios";

export class PersonsError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "PersonsError";
    this.status = status;
  }
}

export async function fetchPersons(page: number): Promise<Persons["results"]> {
  try {
    const response = await api.get<Persons>(
      `${API_PATHS.PERSONS}?page=${page}`
    );
    return response.data?.results ?? null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        "Error al obtener la lista de personas.";
      throw new PersonsError(message, status);
    } else {
      throw new PersonsError("Ocurrió un error inesperado.");
    }
  }
}
