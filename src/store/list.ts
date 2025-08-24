import { Persons } from "@/schemas/persons";
import { api } from "@/services/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonsState {
  persons: Persons["results"] | null;
  fetchPersons: (page: number) => Promise<void>;
}

const usePerson = create<PersonsState>()(
  persist(
    (set) => ({
      persons: null,
      fetchPersons: async (page) => {
        try {
          const response = await api.get<Persons>(`/persons?page=${page}`);

          set({ persons: response.data?.results || null });
        } catch (error) {
          set({ persons: null });
          console.error("Error fetching persons:", error);
        }
      },
    }),

    {
      name: "session-storage",
    }
  )
);

export default usePerson;
