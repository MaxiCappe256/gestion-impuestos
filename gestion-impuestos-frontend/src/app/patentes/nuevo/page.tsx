'use client';

import PatenteForm from '@/components/PatenteForm';
import { useRouter } from 'next/navigation';

export default function NuevaPatentePage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto py-12">
      <button
        onClick={() => router.push('/patentes')}
        className="mb-6 text-zinc-500 hover:text-zinc-800 flex items-center gap-2"
      >
        ← Volver a la lista
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold mb-2 text-black">Nueva Patente</h2>
        <p className="text-zinc-500 mb-8">
          Completá los datos del vehículo para registrarlo en el sistema.
        </p>

        <PatenteForm />
      </div>
    </div>
  );
}
