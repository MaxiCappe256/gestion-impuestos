import {
  createPatente,
  deletePatente,
  getPatentes,
  Patente,
  updatePatente,
} from '@/services/patentes.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

export default function usePatentes() {
  const queryClient = useQueryClient();

  // obtener patentes

  const patentesQuery = useQuery({
    queryKey: ['patentes'], // nombre del cache
    queryFn: getPatentes,
  });

  // crear patentes

  const createMutation = useMutation({
    mutationFn: createPatente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patentes'] });
      toast.success('Patente creada correctamente');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Error al crear la patente';
      toast.error(message);
    },
  });

  // actualizar

  const updateMutation = useMutation({
    mutationFn: ({ id, datos }: { id: string; datos: Partial<Patente> }) =>
      updatePatente(id, datos),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patentes'] });
      toast.success('Patente actualizada correctamente');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Error al actualizar la patente';
      toast.error(message);
    },
  });

  // eliminar

  const deleteMutation = useMutation({
    mutationFn: deletePatente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patentes'] });
      toast.success('Patente eliminada correctamente');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Error al eliminar la patente';
      toast.error(message);
    },
  });

  return {
    patentesQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
