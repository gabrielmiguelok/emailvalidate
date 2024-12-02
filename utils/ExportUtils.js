// /utils/ExportUtils.js

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta datos a un archivo de Excel (.xlsx).
 * @param {Array<Object>} exportData - Los datos a exportar.
 */
export const exportToExcel = (exportData) => {
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(dataBlob, 'data_export.xlsx');
};

/**
 * Exporta datos a un archivo CSV (.csv).
 * @param {Array<Object>} exportData - Los datos a exportar.
 */
export const exportToCSV = (exportData) => {
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'data_export.csv');
};
