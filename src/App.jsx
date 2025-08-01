import React from 'react'
import { Box, Typography } from '@mui/material';
import TransactionAggregator from './components/TransactionAggregator';

function App() {
  return (

    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',}}>
      {/* HEADER */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#777af0',
        color: 'white',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <Typography sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          RECS HELPER
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexGrow: 1,
      }}>
        <TransactionAggregator />
      </Box>
    </Box>
  );
}

export default App
