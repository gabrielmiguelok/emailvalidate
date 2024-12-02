// DataGridComponent.js

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

// Estilos personalizados para el DataGrid
const StyledDataGrid = styled(DataGrid)(({ theme, customStyles }) => ({
  border: 'none',
  fontFamily: theme.typography.fontFamily,
  backgroundColor: customStyles?.gridBackground || 'transparent',
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${customStyles?.cellBorderColor || '#e0e0e0'}`,
    fontSize: customStyles?.cellFontSize || theme.typography.body2.fontSize,
    color: customStyles?.cellTextColor || theme.palette.text.primary,
    padding: '8px',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: customStyles?.headerBackgroundColor || '#f5f5f5',
    borderBottom: `1px solid ${customStyles?.headerBorderColor || '#e0e0e0'}`,
    fontSize: customStyles?.headerFontSize || theme.typography.body2.fontSize,
    fontWeight: customStyles?.headerFontWeight || theme.typography.fontWeightMedium,
    color: customStyles?.headerTextColor || theme.palette.text.primary,
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${customStyles?.footerBorderColor || '#e0e0e0'}`,
    backgroundColor: customStyles?.footerBackgroundColor || '#f5f5f5',
    color: customStyles?.footerTextColor || theme.palette.text.primary,
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: customStyles?.rowHoverColor || '#fafafa',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
}));

export default function DataGridComponent({
  data,
  columns,
  processRowUpdate,
  loading,
  rowHeight = 50,
  headerHeight = 56,
  pageSize = 10,
  rowsPerPageOptions = [10, 25, 50],
  customStyles = {},
  ...props
}) {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <StyledDataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        pagination
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        processRowUpdate={processRowUpdate}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
        loading={loading}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
        }}
        {...props}
      />
    </Box>
  );
}

// Overlay personalizado para el estado de carga
function CustomLoadingOverlay() {
  return (
    <Box sx={{ textAlign: 'center', py: 3 }}>
      <CircularProgress />
    </Box>
  );
}
