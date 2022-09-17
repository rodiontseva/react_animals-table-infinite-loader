import { Container } from '@mui/material';
import React, { FC, useState } from 'react';
import './App.css';
import { PetsForm } from './components/PetsForm';
import { PetsTable } from './components/PetsTable';
import { Pet } from './types/Pet';

export const App: FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  console.log(pets);

  return (
    <Container>
      <PetsForm setPets={setPets} />
      <PetsTable/>
    </Container>
  );
}
