/**
 * Inscripciones "Nuevas Generaciones" → Google Sheets
 * ---------------------------------------------------
 * Recibe los envíos del formulario (index.html) y los guarda como filas
 * en la planilla. Los datos quedan SOLO en tu cuenta de Google.
 *
 * Cómo instalarlo: ver README.md → "Conectar Google Sheets".
 */

const SHEET_NAME = 'Inscripciones';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // evita que dos envíos simultáneos se pisen
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Primera vez: crea la hoja con encabezados
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Fecha de envío', 'Nombre', 'Teléfono', 'Edad']);
      sheet.getRange('A1:D1').setFontWeight('bold');
    }

    const p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      p.nombre   || '',
      p.telefono || '',
      p.edad     || ''
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
