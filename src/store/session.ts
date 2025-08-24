import { Role } from "@/schemas/session";
import { api } from "@/services/api";
import { LoginResponse } from "@/services/log-in";
import { redirect } from "next/navigation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  login: (payload: LoginResponse) => void;
  logout: () => void;
  token: string | null;
  role: Role;
  email?: string;
}

const useSession = create<SessionState>()(
  persist(
    (set) => ({
      role: "guest",
      token: null,
      email: undefined,
      login: ({ token, role, email }) => {
        set({ token, role, email });
        return redirect("/dashboard");
      },
      logout: () => {
        api.get("/logout").then(() => {
          set({ token: null, role: "guest", email: undefined });
          return redirect("/");
        });
      },
    }),

    {
      name: "session-storage",
    }
  )
);

export default useSession;
