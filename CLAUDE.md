# CLAUDE.md

Contexto del proyecto para Claude Code. Léelo antes de hacer cambios.

## Qué es

Formulario web de inscripción al **Culto "Nuevas Generaciones"** de Juventud
Adventista (IASD), Las Condes. La gente lo abre escaneando un QR que va en la
invitación (la arma Kate, comunicaciones). El mismo sitio genera ese QR.

## Stack y decisiones

- **HTML único, sin build step.** Todo vive en `index.html` (estilos y JS
  inline). Mantenerlo así salvo que se pida lo contrario.
- **Alojamiento: GitHub Pages** (estático). El archivo se llama `index.html`
  para que el link funcione sin nombre de archivo.
- **Backend: Google Sheets vía Google Apps Script.** El formulario hace `fetch`
  POST (modo `no-cors`, body urlencoded) a la URL `/exec` del Web App. El script
  (`google-apps-script.gs`) escribe cada envío como fila en una planilla del
  dueño. Las respuestas son **privadas**: viven en el Google Drive del dueño.
  - La constante `ENDPOINT` (arriba del `<script>` en `index.html`) guarda la
    URL del Web App. Si queda con el placeholder `PEGA_AQUI...`, el form muestra
    un aviso en vez de enviar.
- **QR: librería `qrcodejs`** vía CDN (cdnjs). No agregar dependencias con npm.

## Estructura del archivo

- `ENDPOINT`: URL del Google Apps Script (no hardcodear, se pega tras desplegar).
- `EVENTO` (objeto JS): único lugar a editar para **fecha, hora y lugar**.
- `<form id="formCulto">`: campos **nombre*, telefono*, edad***. Más un honeypot
  oculto `bot-field` (anti-spam) que, si viene lleno, descarta el envío.
- Envío por `fetch` `no-cors` a `ENDPOINT` (urlencoded) → muestra `#ok` sin recargar.
- `pintarQR()`: genera el QR sobre `location.origin + pathname` (sin hash/query),
  nivel de corrección H, y dibuja el emblema "JA" al centro del canvas.
- Vista QR accesible desde el link del pie o agregando `#qr` a la URL.

## Convenciones

- Todo el texto de cara al usuario va en **español (es-CL)**.
- No quitar el honeypot `bot-field` ni la validación; mantienen limpios los datos.
- El QR debe seguir apuntando a la URL limpia del formulario; no hardcodear dominios.

## Flujo de despliegue

Ver `README.md` (pasos detallados). En resumen:

1. Crear planilla en Google Sheets → Extensiones → Apps Script → pegar
   `google-apps-script.gs` → Implementar como Web App ("Cualquier usuario").
2. Pegar la URL `/exec` en `const ENDPOINT` de `index.html`.
3. Subir a GitHub → Settings → Pages → Deploy from branch (root).
4. Editar `EVENTO` (fecha/hora/lugar reales).
5. Abrir el link, generar el QR, descargar el PNG y pasárselo a Kate.

## Pendientes

- [ ] Cargar fecha/hora/lugar reales del culto.
- [ ] Pegar la URL real de Google Apps Script en `ENDPOINT`.
- [ ] (Opcional) Notificación por correo en el script (`MailApp.sendEmail`) al
      llegar cada inscripción.
- [ ] (Opcional) Reemplazar emblema CSS por el logo JA oficial.
- [ ] (Opcional) Validación de teléfono chileno (+56 9 ...).

## Notas

- En vista previa local el envío no guarda nada hasta que `ENDPOINT` apunte a un
  Web App desplegado. El estado de éxito se muestra igual una vez configurado.
- "Cualquier usuario" en la implementación permite **enviar**, no **leer**: las
  respuestas siguen siendo privadas del dueño de la planilla.
