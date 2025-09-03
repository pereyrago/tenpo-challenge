import PATHS from "@/constants/paths";
import { STORAGE_SESSION_KEY } from "@/lib/constants";
import { Persons } from "@/schemas/persons";
import { Role } from "@/schemas/session";
import { api } from "@/services/api";
import { LoginResponse } from "@/services/log-in";
import { fetchPersons, PersonsError } from "@/services/persons";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  login: (payload: LoginResponse) => void;
  logout: () => Promise<void>;
  token: string | null;
  role: Role;
  email?: string;
  persons: Persons["results"] | null;
  fetchPersons: (page: number) => Promise<void>;
}

const useSession = create<SessionState>()(
  persist(
    (set, get) => ({
      role: "guest",
      token: null,
      email: undefined,
      login: ({ token, role, email }) => {
        set({ token, role, email });
      },
      logout: async () => {
        await api.get("/logout");
        set({ token: null, role: "guest", email: undefined, persons: null });
      },
      persons: null,
      fetchPersons: async (page: number) => {
        try {
          const results = await fetchPersons(page);
          set({ persons: results });
        } catch (error) {
          set({ persons: null });
          if (error instanceof PersonsError) {
            if (error.status === 498) {
              await get().logout();
              return;
            }
            console.error(error.message);
          } else {
            console.error("Error desconocido al obtener personas.");
          }
        }
      },
    }),

    {
      name: STORAGE_SESSION_KEY,
    }
  )
);

export default useSession;
