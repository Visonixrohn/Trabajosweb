// Utilidad para obtener datos de Google Sheets usando la API pública de Sheets
// Requiere: API_KEY y SHEET_ID

export interface Project {
  negocio: string;
  imagen: string;
  descripcion: string;
}

const API_KEY = "AIzaSyCRaYqfOqmlpAfMZ0A9ZJ7_SfoQSPGAr74"; // ⚠️ Considera ocultarla
const SHEET_ID = "1IdSe25kB0DaySe7lzs2Ao7tRseXTD7N00Oapiu-2x1E";
const SHEET_NAME = "COLABORACION";

export async function fetchProjectsFromSheet(): Promise<Project[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!B2:D100?key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo obtener la hoja de cálculo");

  const data = await res.json();

  // data.values: [[NEGOCIO, IMAGEN, DESCRIPCION], ...]
  return (data.values || [])
    .filter((row) => row[0] && row[1] && row[2]) // Validar que todas las columnas existan
    .map((row) => ({
      negocio: row[0],
      imagen: row[1],
      descripcion: row[2],
    }));
}
