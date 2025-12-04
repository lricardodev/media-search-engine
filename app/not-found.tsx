import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <AlertCircle className="w-20 h-20 text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando. Puede
        que haya sido eliminada o que la dirección sea incorrecta.
      </p>
      <Link href="/">
        <Button size="lg">Volver al Inicio</Button>
      </Link>
    </div>
  );
}
