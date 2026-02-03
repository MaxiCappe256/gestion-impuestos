import { api } from '@/api/axios';

// La interface que definimos con el _id que genera Mongo
export interface Patente {
  _id: string;
  name: string;
  dominio: string;
  paid: boolean;
}

// GET: Trae el array completo
export const getPatentes = async (): Promise<Patente[]> => {
  const { data } = await api.get('/patentes');
  return data;
};

// POST: Mandamos datos sin ID, recibimos el objeto con ID
export const createPatente = async (
  nuevaPatente: Omit<Patente, '_id'>,
): Promise<Patente> => {
  const { data } = await api.post('/patentes', nuevaPatente);
  return data;
};

// PATCH: Mandamos ID por URL y datos parciales (solo lo que cambia)
export const updatePatente = async (
  id: string,
  datos: Partial<Patente>,
): Promise<Patente> => {
  const { data } = await api.patch(`/patentes/${id}`, datos);
  return data;
};

// DELETE: Solo avisamos que borre, no esperamos datos de vuelta
export const deletePatente = async (id: string): Promise<void> => {
  await api.delete(`/patentes/${id}`);
};
