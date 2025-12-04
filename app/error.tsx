"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-6" />
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        ¡Algo salió mal!
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado. Por
        favor, intenta recargar la página.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="primary">
          Intentar de nuevo
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="secondary"
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
}
