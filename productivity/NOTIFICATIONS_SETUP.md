# Cómo activar las notificaciones

Seguí estos pasos en orden. Todo el código ya está escrito — solo hay que configurar las claves y servicios externos.

---

## Paso 1 — Generar las VAPID Keys

Las VAPID keys son como una firma digital que le dice al navegador "este push viene de Pockly".

**1.1** Abrí una terminal en la carpeta del proyecto y ejecutá:

```bash
npx web-push generate-vapid-keys
```

**1.2** Va a aparecer algo así:

```
Public Key:  BAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Private Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**1.3** Abrí el archivo `src/environments/environment.ts` y pegá la **Public Key** donde dice `vapidPublicKey`:

```ts
vapidPublicKey: 'BAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
```

> Guardá ambas keys en un lugar seguro — las vas a necesitar en el paso 2.

---

## Paso 2 — Configurar los secrets en Supabase

Los "secrets" son variables de entorno privadas que las funciones del servidor usan sin exponerlas en el código.

**2.1** Entrá a [supabase.com](https://supabase.com) → tu proyecto → en el menú izquierdo buscá **Edge Functions** → hacé clic en **Manage secrets**.

**2.2** Agregá estos 4 secrets uno por uno (botón "Add secret"):

| Nombre | Valor |
|---|---|
| `VAPID_PUBLIC_KEY` | La Public Key del paso 1 |
| `VAPID_PRIVATE_KEY` | La Private Key del paso 1 |
| `VAPID_SUBJECT` | `mailto:tu@email.com` (usá tu email real) |
| `CRON_SECRET` | Inventá una contraseña larga, ej: `mi-clave-secreta-2024` |

> El `CRON_SECRET` es solo una contraseña que vos inventás. Sirve para que nadie externo pueda dispararle notificaciones a todos tus usuarios.

---

## Paso 3 — Correr las tablas SQL en Supabase

Hay que crear las tablas nuevas en tu base de datos.

**3.1** En Supabase → menú izquierdo → **SQL Editor**.

**3.2** Abrí el archivo `supabase.sql` de tu proyecto, copiá todo el contenido y pegalo en el SQL Editor de Supabase. Hacé clic en **Run**.

> Si ves errores de "table already exists", está bien — significa que esas tablas ya existían.

---

## Paso 4 — Hacer deploy de las Edge Functions

Las Edge Functions son las funciones del servidor que mandan los pushes.

**4.1** Necesitás tener la CLI de Supabase instalada. Si no la tenés:

```bash
npm install -g supabase
```

**4.2** Iniciá sesión:

```bash
supabase login
```

**4.3** Desde la carpeta raíz del proyecto, ejecutá:

```bash
supabase functions deploy save-push-subscription
supabase functions deploy delete-push-subscription
supabase functions deploy save-notification-preferences
supabase functions deploy send-scheduled-notifications
```

Cada uno debería terminar con un mensaje de éxito.

---

## Paso 5 — Configurar el envío automático cada 15 minutos

Esto hace que Supabase llame automáticamente a la función de notificaciones cada 15 minutos para revisar a quién hay que notificar.

**5.1** En Supabase → **SQL Editor**, primero verificá que las extensiones estén activas. Corré esto:

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;
```

> Si da error de permisos, andá a **Database → Extensions**, buscá `pg_cron` y `pg_net`, y activálos desde ahí.

**5.2** Luego corré esto (reemplazá `mi-clave-secreta-2024` con el mismo valor que pusiste como `CRON_SECRET` en el paso 2):

```sql
SELECT cron.schedule(
  'send-notifications',
  '*/15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://obnhkmiwouzangklvuhi.supabase.co/functions/v1/send-scheduled-notifications',
    headers := jsonb_build_object('x-cron-secret', 'mi-clave-secreta-2024')
  )
  $$
);
```

**5.3** Para verificar que quedó configurado, corré:

```sql
SELECT * FROM cron.job;
```

Deberías ver una fila con el nombre `send-notifications`.

---

## Paso 6 — Probar que todo funciona

**6.1** Abrí la app en el navegador.

**6.2** Hacé clic en la **campana** en el nav → **Settings**.

**6.3** Hacé clic en **Enable** en la sección Push → el navegador te va a pedir permiso para notificaciones → aceptá.

**6.4** Configurá la hora del recordatorio para dentro de 1-2 minutos de ahora y guardá.

**6.5** Para forzar el envío inmediato (sin esperar 15 minutos), ejecutá esto en tu terminal:

```bash
curl -X POST https://obnhkmiwouzangklvuhi.supabase.co/functions/v1/send-scheduled-notifications \
  -H "x-cron-secret: mi-clave-secreta-2024"
```

Si todo está bien, deberías recibir la notificación push en el navegador.

---

## Resumen del flujo

```
Vos configurás la hora (ej: 20:00, Buenos Aires)
            ↓
Cada 15 min → Supabase revisa qué usuarios tienen su hora de recordatorio ahora
            ↓
Para cada usuario: revisa hábitos sin completar + tareas de hoy + rachas en riesgo
            ↓
Manda push al dispositivo
```

La campana en el nav funciona **sin hacer nada** — calcula en tiempo real desde tus datos locales.

---

## Si algo falla

| Problema | Qué revisar |
|---|---|
| No llega el push | Verificá que `VAPID_PUBLIC_KEY` en `environment.ts` coincide con el secret en Supabase |
| El cron no corre | Verificá que `pg_net` está habilitado y que el `CRON_SECRET` coincide |
| Error al hacer deploy | Corré `supabase login` de nuevo y verificá estar en la carpeta correcta |
