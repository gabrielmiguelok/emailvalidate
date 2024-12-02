// /hooks/useExport.js

import { useState } from 'react';
import axios from 'axios';
import { exportToExcel, exportToCSV } from '../utils/ExportUtils';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useExport = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleSuccessMessageClose = () => {
    setSuccessMessageOpen(false);
  };

  const handleErrorMessageClose = () => {
    setErrorMessage('');
  };

  /**
   * Función para manejar la exportación.
   * @param {string} format - Formato de exportación ('excel' o 'csv').
   * @param {object} exportParams - Parámetros para la exportación (opcional).
   * @param {Array} selectedColumns - Columnas seleccionadas (opcional).
   * @param {Array} dataToExport - Datos proporcionados directamente para exportar (opcional).
   */
  const handleExport = async (format, exportParams = {}, selectedColumns = [], dataToExport = null) => {
    try {
      let data;

      if (dataToExport) {
        // Si se proporcionan datos directamente, los usamos
        data = dataToExport;
      } else {
        // Si no, hacemos la solicitud al backend para obtener los datos
        const response = await axios.post('/api/tabpanel/export', {
          ...exportParams,
          columns: selectedColumns, // Enviar columns como arreglo
        });

        data = response.data.data;
      }

      if (!data || data.length === 0) {
        setErrorMessage('No hay datos para exportar.');
        return;
      }

      // Dependiendo del formato, llamar a la función correspondiente
      if (format === 'excel') {
        exportToExcel(data);
      } else if (format === 'csv') {
        exportToCSV(data);
      }

      setSuccessMessageOpen(true);
    } catch (error) {
      console.error('Error al exportar datos:', error);
      setErrorMessage(
        error.response?.data?.message || error.message || 'Error al exportar los datos.'
      );
    }
  };

  const ExportSnackbar = () => (
    <>
      {/* Snackbar para notificaciones de éxito */}
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={handleSuccessMessageClose}
        message="Exportación exitosa"
        action={
          <IconButton size="small" color="inherit" onClick={handleSuccessMessageClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      {/* Snackbar para notificaciones de error */}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={5000}
        onClose={handleErrorMessageClose}
        message={errorMessage}
        action={
          <IconButton size="small" color="inherit" onClick={handleErrorMessageClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );

  return { handleExport, ExportSnackbar };
};

export default useExport;
