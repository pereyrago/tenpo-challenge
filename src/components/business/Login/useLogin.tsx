import { useState, FormEvent, ChangeEvent } from "react";
import * as z from "zod";
import { loginSchema } from "@/schemas/login";
import { login } from "@/services/log-in";
import useSession from "@/store/session";
import { useRouter } from "next/navigation";
import PATHS from "@/constants/paths";

export type FormState = {
  email: string;
  password: string;
  errors: string[];
  loading?: boolean;
  showPassword?: boolean;
};

const initialState: FormState = {
  email: "",
  password: "",
  errors: [],
  loading: false,
  showPassword: false,
};

export const useLogin = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginSchema.parse({
        email: formState.email,
        password: formState.password,
      });
      setFormState((prev) => ({
        ...prev,
        errors: [],
        loading: true,
      }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setFormState((prev) => ({
          ...prev,
          errors: err.issues.map((issue) => issue.message),
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          errors: ["Error desconocido de validación"],
        }));
      }
      return;
    }

    try {
      const res = await login(formState.email, formState.password);
      session.login(res);
      router.replace(PATHS.LIST);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocurrió un error inesperado.";
      setFormState((prev) => ({ ...prev, errors: [message] }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      loading: false,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setFormState((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  return {
    formState,
    setFormState,
    handleSubmit,
    handleChange,
    toggleShowPassword,
  };
};

