import React, { useRef, useState } from 'react';
import { Button, Card, CardContent, Typography, Box, List, ListItem } from '@mui/material';
import * as XLSX from 'xlsx';

export default function TransactionAggregator() {
  const inputRef = useRef();
  const [fileName, setFileName] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const aggregated = {};
    jsonData.forEach(row => {
      const orderNo = row['Order No'];
      const amount = parseFloat(row['Amount']) || 0;
      aggregated[orderNo] = (aggregated[orderNo] || 0) + amount;
    });

    const result = Object.entries(aggregated).map(([orderNo, amount]) => ({
      'Order No': orderNo,
      'Amount': amount
    }));

    const newSheet = XLSX.utils.json_to_sheet(result);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Condensed');
    XLSX.writeFile(newWorkbook, 'condensed_transactions.xlsx');
  };

  return (
    <Card sx={{ backgroundColor: '#c1f8e9', maxWidth: 1000 }}>
      <CardContent sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Box sx={{
          mb: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="h4" sx={{ my: 3,  fontWeight: 'bold'}}>
            Upload Account Transactions
          </Typography>
          <Typography variant="body1" sx={{ mb: 0, fontStyle: 'italic' }}>
            Use when you aren't sure where the account discrepency occurs.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
            Once you upload the file, it will return a new file showing where the discrepency lies.
          </Typography>
          
          <List sx={{
            listStyleType: 'decimal',
            pl: 2,
            mx: 2
          }}>
          <ListItem sx={{ display: 'list-item' }}>In Pronto, open the users Transactions by pressing 'T'</ListItem>
          <ListItem sx={{ display: 'list-item' }}>Press 'L' to show ALL transactions </ListItem>
          <ListItem sx={{ display: 'list-item' }}>Export from Pronto to Excel and save the file anywhere</ListItem>
          <ListItem sx={{ display: 'list-item' }}>Upload that file using the button below.</ListItem>
        </List>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button variant="contained" onClick={() => inputRef.current.click()}>
            Choose File
          </Button>
          <Typography variant="body2">{fileName}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
