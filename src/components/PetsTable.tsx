import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { getPets } from '../api/pets'
import { Pet } from '../types/Pet'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

interface Props {
  pets: Pet[],
  setPets: Dispatch<SetStateAction<Pet[]>>,
}
export const PetsTable: FC<Props> = (props) => {
  const { pets, setPets } = props;
  const rows: GridRowsProp = pets.map(pet => {
    return {
      id: pet.id,
      col1: pet.name,
      col2: pet.breed,
      col3: pet.age,
      col4: pet.gender,
      col5: pet.owner_name,
      col6: pet.owner_email,
    }
  });

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Pet name', width: 150 },
    { field: 'col2', headerName: 'Breed', width: 150 },
    { field: 'col3', headerName: 'Age', width: 150 },
    { field: 'col4', headerName: 'Gender', width: 150 },
    { field: 'col5', headerName: 'Owner name', width: 150 },
    { field: 'col6', headerName: 'Owner email', width: 150 },
  ];

  useEffect(() => {
    getPets()
      .then(setPets)
      .catch(() => {
        throw new Error('Unable to display pets list')
      })
  }, [setPets]);

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
      }}
    >
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
