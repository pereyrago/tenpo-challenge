"use client";
import React from "react";
import { Button } from "../../ui/button";
import { useLogin } from "./useLogin";
import { Input } from "../../ui/input";
import { EyeClosedIcon, EyeIcon, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";

const Login = () => {
  const { formState, handleSubmit, handleChange, toggleShowPassword } =
    useLogin();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-md max-w-sm h-fit px-4"
    >
      <Image
        src="/images/logo.svg"
        alt="Tenpo Logo"
        width={137}
        height={46}
        className="mx-auto mb-4"
      />
      <div className="flex gap-4">
        <div className="relative w-full max-w-sm">
          <MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />{" "}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="pl-10"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="relative w-full max-w-sm">
        <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />{" "}
        <Input
          type={formState.showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          className="pl-10"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0"
          onClick={toggleShowPassword}
          type="button"
        >
          {!formState.showPassword ? (
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <EyeClosedIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          variant="link"
          className="text-xs self-end text-foreground"
        >
          Registrate
        </Button>
        <Button
          type="button"
          variant="link"
          className="text-xs self-end text-foreground"
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </div>
      <Button
        type="submit"
        className="px-4 w-full mt-2 text-secondary"
        disabled={!formState.email || !formState.password || formState.loading}
      >
        Entrar
      </Button>
      <div className="h-[4rem]">
        {formState.errors.length > 0 &&
          formState.errors.map((message, i) => (
            <div key={i} className="text-red-500 text-xs">
              {message}
            </div>
          ))}
      </div>
    </form>
  );
};

export default Login;
