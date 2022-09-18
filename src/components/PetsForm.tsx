import React, { FC, SetStateAction, useState, Dispatch, FormEvent } from 'react';
import { createPet } from '../api/pets';
import { Gender } from '../types/Gender';
import { CreatePetFragment } from '../types/Pet';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';

interface Props {
  setIsUpdateTable: Dispatch<SetStateAction<boolean>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

export const PetsForm: FC<Props> = (props) => {
  const { setIsUpdateTable, setOpen } = props;
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
    setPetOwnerEmail('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsUpdateTable(false);

    const createdPet: CreatePetFragment = {
      name: petName,
      breed: petBreed,
      age: petAge,
      gender: petGender,
      owner_name: petOwnerName,
      owner_email: petOwnerEmail,
    };

    createPet(createdPet)
      .catch(() => {
        throw new Error('Unable to add a pet');
      })
      .finally(() => {
        clearForm();
        setIsUpdateTable(true);
        setOpen(false);
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
      <Grid
        container
        direction='column'
        columns={1}
      >
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              name="petName"
              label="Pet name"
              variant="outlined"
              size="small"
              value={petName}
              onChange={event => setPetName((event.target.value).trim())}
              required
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              name="petBreed"
              label="Breed"
              variant="outlined"
              size="small"
              value={petBreed ?? ''}
              onChange={event => setPetBreed(event.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              name="petAge"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 30 } }}
              label="Age"
              variant="outlined"
              size="small"
              value={petAge ?? ''}
              onChange={event => setPetAge(Number(event.target.value))}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="gender">Good boy or girl?</InputLabel>
            <Select
              name="petGender"
              labelId="gender"
              label="Good boy or girl?"
              id='mySelect'
              onChange={event => setPetGender(event.target.value as Gender)}
              required
              defaultValue={Gender.Male}
            >
              {Object.values(Gender).map(gender => (
                <MenuItem value={gender} key={gender}>{gender}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              name="petOwnerName"
              label="Your name"
              variant="outlined"
              size="small"
              value={petOwnerName}
              onChange={event => setPetOwnerName((event.target.value).trim())}
              required
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, marginBottom: 5, minWidth: 120 }}>
            <TextField
              name="petOwnerEmail"
              label="email@example.com"
              variant="outlined"
              size="small"
              type="email"
              value={petOwnerEmail}
              onChange={event => setPetOwnerEmail(event.target.value)}
              required
            />
          </FormControl>
        </Grid>
      </Grid>

      <Button
        type="submit"
        disabled={isDisableSubmitButton()}
        variant="outlined"
        color="secondary"
      >
        Add
      </Button>
    </form>
  );
}
