// Utilidad para obtener datos de Google Sheets usando la API pública de Sheets
// Requiere: API_KEY y SHEET_ID

export interface LogoItem {
  imagen: string;
}

const API_KEY = "AIzaSyCRaYqfOqmlpAfMZ0A9ZJ7_SfoQSPGAr74"; // ⚠️ Ocúltala con variable de entorno si puedes
const SHEET_ID = "1IdSe25kB0DaySe7lzs2Ao7tRseXTD7N00Oapiu-2x1E";
const SHEET_NAME = "LOGOS";

export async function fetchLogosFromSheet(): Promise<LogoItem[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!B2:B1000?key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo obtener la hoja de cálculo");

  const data = await res.json();

  // data.values: [[IMAGEN], [IMAGEN], ...]
  return (data.values || [])
    .filter((row) => row[0]) // Validar que haya imagen
    .map((row) => ({
      imagen: row[0],
    }));
}
