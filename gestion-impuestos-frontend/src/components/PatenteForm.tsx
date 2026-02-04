"use client";

import { useForm } from "react-hook-form";
import usePatentes from "@/hooks/usePatentes";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  dominio: string;
};

export default function PatenteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { createMutation } = usePatentes();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        // Después de crearla con éxito, volvemos a la lista sola
        router.push("/patentes");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-500">
          Nombre del Vehículo (Ej: Hilux)
        </label>
        <input
          {...register("name", { required: "El nombre es obligatorio" })}
          className="w-full p-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Ej: Toyota Hilux"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-500 border-gray-500">
          Dominio / Patente
        </label>
        <input
          {...register("dominio", {
            required: "La patente es obligatoria",
            pattern: {
              value: /^[A-Z0-9\s]+$/i,
              message: "Formato de patente no válido",
            },
          })}
          className="w-full p-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          placeholder="Ej: AA123BB"
        />
        {errors.dominio && (
          <p className="text-red-500 text-xs mt-1">{errors.dominio.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="w-full cursor-pointer text-xl bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-black transition disabled:opacity-50"
      >
        {createMutation.isPending ? "Guardando..." : "Registrar Vehículo"}
      </button>
    </form>
  );
}
