import { Pet, CreatePetFragment } from '../types/Pet'
import { client } from '../utils/fetchClient'

export const getPets = async (): Promise<Pet[]> => {
  return await client.get<Pet[]>('animals')
};

export const createPet = async (enteredAnimal: CreatePetFragment): Promise<Pet> => {
  return await client.post<Pet>('animals', enteredAnimal)
};
