"use client";

import Link from "next/link";
import usePatentes from "@/hooks/usePatentes";

export default function page() {
  const { patentesQuery, deleteMutation } = usePatentes();
  const { data: patentes, isLoading, isError } = patentesQuery;

  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl">Patentes</h1>
        <Link
          href="/patentes/nuevo"
          className="cursor-pointer w-full text-center text-2xl text-white bg-blue-700 px-4 py-2 rounded-md"
        >
          Agregar Patente
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patentes?.map((p) => (
          // {Array.isArray(patentes) && patentes.length > 0 ?
          <div className="border p-3 rounded-md shadow-md" key={p._id}>
            <h2 className="font-bold text-2xl uppercase">{p.domain}</h2>
            <p className="text-zinc-500 text-xl">{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
