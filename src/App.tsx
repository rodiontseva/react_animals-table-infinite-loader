import { Button, Container, Grid } from '@mui/material';
import Add from '@mui/icons-material/Add';
import React, { FC, useState } from 'react';
import './App.css';
import { PetsForm } from './components/PetsForm';
import { PetsTable } from './components/PetsTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const App: FC = () => {
  const [isUpdateTable, setIsUpdateTable] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom color="#37474f">
          List of pets
      </Typography>

      <Grid
        container
        columns={1}
        rowSpacing={3}
        direction='column'
      >
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
            onClick={handleClickOpen}
          >
            Add your pet
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography variant="h4" gutterBottom color="#37474f">
                Add a pet
              </Typography>
            </DialogTitle>

            <DialogContent>
              <PetsForm
                setIsUpdateTable={setIsUpdateTable}
                setOpen={setOpen}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid item>
          {isUpdateTable && (
            <PetsTable />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
