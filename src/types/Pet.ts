/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Gender } from './Gender';

export interface Pet {
  id: number,
  name: string,
  breed: string | null,
  age: number | null,
  gender: Gender,
  owner_name: string,
  owner_email: string,
}

export type CreatePetFragment = Omit<Pet, 'id'>;
