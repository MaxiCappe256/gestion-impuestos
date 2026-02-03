'use client';

import usePatentes from '@/hooks/usePatentes';
import Link from 'next/link';

export default function PatentesPage() {
  const { patentesQuery, deleteMutation } = usePatentes();
  const { data: patentes, isLoading, isError } = patentesQuery;

  const handleEliminar = (id: string) => {
    if (confirm('¿Estás seguro de que querés eliminar esta patente?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-10 text-center">Cargando...</div>;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Error al conectar con la API de NestJS.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Vehículos</h1>
        <Link
          href="/patentes/nuevo"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Agregar Patente
        </Link>
      </header>

      <div className="grid gap-4">
        {Array.isArray(patentes) && patentes.length > 0 ? (
          patentes.map((p) => (
            <div
              key={p._id}
              className="bg-white p-5 rounded-xl border flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="text-xs text-zinc-400 font-mono mb-1">
                  ID: {p._id}
                </p>
                <h3 className="text-2xl font-bold uppercase tracking-widest">
                  {p.dominio}
                </h3>
                <p className="text-zinc-600">{p.name}</p>
              </div>
              <button
                onClick={() => handleEliminar(p._id)}
                disabled={deleteMutation.isPending}
                className="text-red-500 hover:bg-red-50 p-2 rounded-md transition"
              >
                {deleteMutation.isPending ? 'Borrando...' : 'Eliminar'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center py-20 text-zinc-500 border-2 border-dashed rounded-xl">
            No hay patentes. Hacé clic en "Agregar" para empezar.
          </p>
        )}
      </div>
    </div>
  );
}
