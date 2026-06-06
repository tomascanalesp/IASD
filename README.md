# Inscripción · Culto "Nuevas Generaciones" (JA · IASD Las Condes)

Formulario web de inscripción. Se aloja **gratis en GitHub Pages** y las
respuestas (nombre, teléfono, edad) se guardan en una **planilla de Google
Sheets tuya** — solo tú, dueño del link, puedes verlas.

```
[ Persona escanea QR ] → [ index.html en GitHub Pages ] → [ Google Apps Script ] → [ Tu Google Sheet privada ]
```

- `index.html` — el formulario (HTML único, sin build). Es lo que se publica.
- `google-apps-script.gs` — el código que recibe los envíos y los escribe en tu planilla.

---

## 1) Conectar Google Sheets (hazlo una vez)

1. Entra a <https://sheets.google.com> con **tu** cuenta y crea una planilla nueva.
   Nómbrala, por ejemplo, **"Inscripciones Nuevas Generaciones"**.
2. En esa planilla: menú **Extensiones → Apps Script**.
3. Borra el código de ejemplo, **pega todo el contenido de `google-apps-script.gs`**
   y guarda (icono 💾).
4. Arriba a la derecha: **Implementar → Nueva implementación**.
   - En "Tipo" (el engranaje ⚙️) elige **Aplicación web**.
   - **Ejecutar como:** *Yo (tu correo)*.
   - **Quién tiene acceso:** **Cualquier usuario**.
     *(Esto solo permite ENVIAR el formulario; las respuestas siguen siendo
     privadas, viven en tu planilla. Nadie más puede leerlas.)*
   - Clic en **Implementar**. Google pedirá **autorizar** → acepta los permisos
     (si aparece "Google no verificó la app", entra en *Configuración avanzada →
     Ir a (nombre) → Permitir*: es tu propio script).
5. Copia la **URL de la aplicación web**. Termina en `/exec`, así:
   `https://script.google.com/macros/s/AKfy....../exec`

## 2) Pegar la URL en el formulario

En `index.html`, busca cerca del inicio del `<script>`:

```js
const ENDPOINT = "PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT";
```

Reemplaza el texto por tu URL `/exec`. Guarda.

## 3) Publicar en GitHub Pages (el "link de GitHub")

1. Sube este repositorio a GitHub (si aún no está).
2. En GitHub: **Settings → Pages**.
3. En **Source** elige **Deploy from a branch**, rama `main` (o la que uses),
   carpeta `/ (root)`. Guarda.
4. En ~1 minuto tendrás tu link público, del tipo:
   `https://TU-USUARIO.github.io/IASD/`
   Ese es el link que repartes / que apunta el QR.

> Como el archivo se llama `index.html`, el link funciona directo, sin nombre de archivo.

## 4) Probar

1. Abre tu link de GitHub Pages, llena el formulario y envía.
2. Revisa tu Google Sheet: debe aparecer una fila nueva con
   **Fecha · Nombre · Teléfono · Edad · Escuela Sabática**.
3. ¿Sale el aviso "Falta conectar..."? → no pegaste la URL en el paso 2.
4. ¿No llega la fila? → vuelve a **Implementar → Gestionar implementaciones**
   y confirma que "Quién tiene acceso" = **Cualquier usuario**.

---

## Editar datos del evento

En `index.html`, cambia solo estos textos:

```js
const EVENTO = {
  fecha: "Sábado 13 de junio",
  hora:  "10:00 hrs",
  lugar: "Iglesia Adventista de Las Condes",
  direccion: "Av. Presidente Sebastián Piñera Echenique 415, 7570207 Las Condes, Región Metropolitana"
};
```

## Logos de los grupos

Los logos del pie ("Organizan") y el emblema del encabezado se cargan desde
`assets/`: `iasd.png`, `maranata-class.png`, `gteen.png` y `ja.png` (ya incluidos).
Si quieres cambiar alguno, reemplaza el archivo manteniendo el nombre. Si falta
uno, simplemente no se muestra (no rompe la página).

## Compartir / invitar a un amigo

El enlace del pie **"Comparte e invita a un amigo"** (o agregando `#compartir`
a la URL) abre una vista que genera una **imagen de invitación** con los datos
del culto + un QR, y permite:

- **Compartir invitación**: usa el menú nativo del celular (WhatsApp, Instagram,
  Telegram, etc.) y adjunta la imagen.
- **Enviar por WhatsApp**: abre WhatsApp con el texto + link de inscripción.
- **Descargar imagen**: guarda el PNG para usarlo en la invitación impresa.

## Privacidad

- Las inscripciones se guardan **únicamente en tu planilla de Google**, ligada a
  tu cuenta. Solo tú (o quien tú compartas la planilla) puede leerlas.
- "Cualquier usuario" en la implementación significa que cualquiera puede
  **enviar** el formulario — no que pueda **ver** las respuestas.
- El campo oculto anti-spam (honeypot) descarta envíos automáticos de bots.

## Si cambias el código del script

Cada vez que edites `google-apps-script.gs`, vuelve a **Implementar → Gestionar
implementaciones → editar (lápiz) → Versión: Nueva versión → Implementar**.
La URL `/exec` se mantiene, no hay que volver a pegarla.
