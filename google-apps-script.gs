/**
 * Inscripciones "Nuevas Generaciones" → Google Sheets
 * ---------------------------------------------------
 * Recibe los envíos del formulario (index.html) y los guarda como filas
 * en la planilla. Los datos quedan SOLO en tu cuenta de Google.
 *
 * Cómo instalarlo / actualizarlo: ver README.md → "Conectar Google Sheets".
 */

const SHEET_NAME = 'Inscripciones';
const HEADERS = ['Fecha de envío', 'Nombre', 'Teléfono', 'Edad', 'Escuela Sabática'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // evita que dos envíos simultáneos se pisen
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    // Asegura la fila de encabezados (incluida la columna "Escuela Sabática",
    // aunque la planilla ya existiera con solo 4 columnas).
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    } else if (sheet.getRange(1, 5).getValue() !== HEADERS[4]) {
      sheet.getRange(1, 5).setValue(HEADERS[4]).setFontWeight('bold');
    }

    const p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      p.nombre   || '',
      p.telefono || '',
      p.edad     || '',
      p.escuela  || ''   // incluye "Otros: ..." cuando la persona eligió Otros
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Permite abrir la URL /exec en el navegador para comprobar que está viva.
function doGet() {
  return ContentService
    .createTextOutput('Formulario Nuevas Generaciones: activo ✅')
    .setMimeType(ContentService.MimeType.TEXT);
}
