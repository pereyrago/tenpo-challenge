import Link from "next/link";
import { Button } from "@/components/ui/button";
import PATHS from "@/constants/paths";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-sm text-muted-foreground">Error 404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Página no encontrada
        </h1>
        <p className="mt-2 text-muted-foreground">
          La ruta que intentas abrir no existe o ha cambiado.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="secondary" asChild>
            <Link href={PATHS.HOME}>Ir al Inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
