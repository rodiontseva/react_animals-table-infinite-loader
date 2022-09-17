import React, { FC, SetStateAction, useState, Dispatch, FormEvent } from 'react';
import { createPet } from '../api/pets';
import { Gender } from '../types/Gender';
import { CreatePetFragment, Pet } from '../types/Pet';

interface Props {
  setPets: Dispatch<SetStateAction<Pet[]>>,
}

export const PetsForm: FC<Props> = (props) => {
  const { setPets } = props;
  const [petName, setPetName] = useState<string>('');
  const [petBreed, setPetBreed] = useState<string | null>(null);
  const [petAge, setPetAge] = useState<number | null>(null);
  const [petGender, setPetGender] = useState<Gender>(Gender.Female);
  const [petOwnerName, setPetOwnerName] = useState<string>('');
  const [petOwnerEmail, setPetOwnerEmail] = useState<string>('');

  const validateEmail = (email: string) => {
    return email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const clearForm = () => {
    setPetName('');
    setPetBreed(null);
    setPetAge(null);
    setPetGender(Gender.Female);
    setPetOwnerName('');
    setPetOwnerEmail('')
  };

  const onAdd = (newPet: Pet) => {
    setPets((prevPets) => [...prevPets, newPet]);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const createdPet: CreatePetFragment = {
      name: petName,
      breed: petBreed,
      age: petAge,
      gender: petGender,
      owner_name: petOwnerName,
      owner_email: petOwnerEmail,
    };

    createPet(createdPet)
      .then(onAdd)
      .catch(() => {
        throw new Error('Unable to add a pet');
      })
      .finally(() => {
        clearForm();
      });
  };

  const isDisableSubmitButton = () => (
    !(
      petName.length !== 0 &&
      petOwnerName.length !== 0 &&
      validateEmail(petOwnerEmail) !== null
    )
  );

  return (
    <form
      onSubmit={handleSubmit}
    >
      <h2>Add a pet</h2>

      <input
        name="petName"
        placeholder="Pet name"
        value={petName}
        onChange={event => setPetName((event.target.value).trim())}
        required
      />

      <input
        name="petBreed"
        placeholder="Breed"
        value={petBreed ?? ''}
        onChange={event => setPetBreed(event.target.value)}
      />

      <input
        name="petAge"
        placeholder="Age"
        type="number"
        min="1"
        max="30"
        value={petAge ?? ''}
        onChange={event => setPetAge(Number(event.target.value))}
      />

      <label>
        Good boy or good girl?:
        <select
          id='mySelect'
          name="petGender"
          onChange={event => setPetGender(event.target.value as Gender)}
          required
          defaultValue={Gender.Female}
        >
          {Object.values(Gender).map(gender => (
            <option value={gender} key={gender}>{gender}</option>
          ))}
        </select>
      </label>

      <input
        name="petOwnerName"
        placeholder="Your name"
        value={petOwnerName}
        onChange={event => setPetOwnerName((event.target.value).trim())}
        required
      />

      <input
        name="petOwnerEmail"
        placeholder="email@example.com"
        type="email"
        value={petOwnerEmail}
        onChange={event => setPetOwnerEmail(event.target.value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={isDisableSubmitButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>

  );
}
