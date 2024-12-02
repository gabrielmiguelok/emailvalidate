// EmailValidationSection.js

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import useExport from '../hooks/useExport';
import DataGridComponent from '../components/DataGridComponent';

export default function EmailValidationSection() {
  const [emailList, setEmailList] = useState('');
  const [validationResults, setValidationResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { handleExport, ExportSnackbar } = useExport();

  const handleValidateEmails = async () => {
    const lines = emailList
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    if (lines.length === 0) {
      alert('Por favor, ingresa al menos un correo electrónico.');
      return;
    }

    setLoading(true);
    setValidationResults([]); // Limpiar resultados anteriores

    try {
      for (const line of lines) {
        const emails = line
          .split(',')
          .map((email) => email.trim())
          .filter((email) => email !== '');

        // Validar cada correo en la línea
        for (const email of emails) {
          try {
            const response = await axios.post('/api/validate-emails', { emails: [email] });
            const emailResult = response.data.results[0];
            setValidationResults((prevResults) => [...prevResults, emailResult]);
          } catch (error) {
            console.error('Error al validar correo:', error);
            setValidationResults((prevResults) => [
              ...prevResults,
              {
                id: email,
                email,
                valid: false,
                reason: 'Error al validar el correo',
                code: 'VALIDATION_ERROR',
              },
            ]);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Definir las columnas para el DataGrid
  const columns = [
    { field: 'email', headerName: 'Correo Electrónico', width: 300 },
    {
      field: 'valid',
      headerName: 'Validado',
      width: 100,
      renderCell: (params) => {
        if (params.value === true) {
          return <span style={{ color: 'green' }}>✔️</span>; // Correo válido
        } else if (params.value === false) {
          return <span style={{ color: 'red' }}>❌</span>; // Correo no válido
        } else {
          return <span></span>; // No procesado
        }
      },
    },
    {
      field: 'reason',
      headerName: 'Razón',
      width: 300,
      renderCell: (params) => <span>{params.value || ''}</span>,
    },
  ];

  // Estilos personalizados
  const styles = {
    height: 400,
    width: '100%',
    '& .MuiDataGrid-root': {
      border: 'none',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'transparent',
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: 'none',
    },
  };

  // Función para procesar la actualización de una fila (si es necesario)
  const processRowUpdate = (newRow) => {
    return newRow;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Validación de Correos Electrónicos
      </Typography>
      <TextField
        label="Ingresa los correos electrónicos (uno por línea, separados por comas si hay más de uno)"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={emailList}
        onChange={(e) => setEmailList(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleValidateEmails}
        disabled={loading}
        sx={{ mr: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Validar Correos'}
      </Button>
      {/* Botones de Exportar */}
      {validationResults.length > 0 && (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleExport('excel', {}, columns, validationResults)}
            sx={{ mr: 1 }}
          >
            Exportar a Excel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleExport('csv', {}, columns, validationResults)}
          >
            Exportar a CSV
          </Button>
        </>
      )}
      {validationResults.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <DataGridComponent
            data={validationResults}
            columns={columns}
            styles={styles}
            processRowUpdate={processRowUpdate}
          />
        </Box>
      )}
      <ExportSnackbar />
    </Box>
  );
}
