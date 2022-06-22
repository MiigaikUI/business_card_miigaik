import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function MyLoader() {
 

  return (
    <div>
      <Backdrop
        sx={{ backgroundColor:'white', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  );
}