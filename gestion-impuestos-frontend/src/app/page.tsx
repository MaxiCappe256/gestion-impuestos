import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-4">
        Gestión de Impuestos y Patentes
      </h1>
      <p className="text-zinc-600 mb-8">
        Bienvenido al sistema de administración de vehículos e impuestos.
      </p>

      <div className="flex gap-4">
        <Link
          href="/patentes"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Gestionar Patentes
        </Link>
        <Link
          href="/impuestos"
          className="bg-zinc-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-900 transition"
        >
          Gestionar Impuestos
        </Link>
      </div>
    </div>
  );
}
