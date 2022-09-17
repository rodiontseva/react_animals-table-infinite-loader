import { Pet, CreatePetFragment } from '../types/Pet'
import { client } from '../utils/fetchClient'

export const createPet = async (enteredAnimal: CreatePetFragment): Promise<Pet> => {
  return await client.post<Pet>('create', enteredAnimal)
};
