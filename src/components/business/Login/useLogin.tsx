import { useState, FormEvent, ChangeEvent } from "react";
import * as z from "zod";
import { loginSchema } from "@/schemas/login";
import { login } from "@/services/log-in";
import useSession from "@/store/session";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          loading: false,
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          errors: ["Error desconocido de validación"],
        }));
      }
      return;
    }

    setFormState((prev) => ({
      ...prev,
      loading: false,
    }));

    login(formState.email, formState.password).then((res) => {
      session.login(res);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
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
