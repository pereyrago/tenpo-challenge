import { Persons } from "@/schemas/persons";
import { api } from "@/services/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonsState {
  persons: Persons["results"] | null;
  page: number;
  fetchPersons: (page: number) => Promise<void>;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const usePerson = create<PersonsState>()(
  persist(
    (set) => ({
      persons: null,
      page: 1,
      fetchPersons: async (page) => {
        try {
          const response = await api.get<Persons>(`/persons?page=${page}`);

          set({ persons: response.data?.results || null });
        } catch (error) {
          set({ persons: null });
          console.error("Error fetching persons:", error);
        }
      },
      setPage: (page) => set({ page }),
      nextPage: () => set((state) => ({ page: state.page + 1 })),
      prevPage: () => set((state) => ({ page: Math.max(state.page - 1, 1) })),
    }),

    {
      name: "session-storage",
    }
  )
);

export default usePerson;
