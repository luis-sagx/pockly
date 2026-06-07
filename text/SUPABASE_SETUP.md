# Guía de Configuración de Supabase

## 1. Crear un proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y registrate o iniciá sesión.
2. Hacé clic en **New project**.
3. Completá:
   - **Name**: por ejemplo `pockly-text`
   - **Database Password**: generá una contraseña fuerte y guardala
   - **Region**: elegí la más cercana a tus usuarios
4. Esperá ~2 minutos a que el proyecto se provisione.

## 2. Obtener las credenciales

1. En el dashboard de Supabase, andá a **Project Settings** (ícono del engranaje) → **API**.
2. Copiá estos dos valores:
   - **Project URL** (tiene la forma `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (empieza con `eyJ...`)

> ⚠️ **¿Es seguro exponer la anon key?** Sí. La anon key está **diseñada para ser pública**. Solo puede acceder a datos que las políticas RLS (Row Level Security) permitan. Como configuramos RLS para que cada usuario solo vea sus propias notas, alguien con tu anon key no puede leer ni modificar datos ajenos.

## 3. Configurar las credenciales

### Para desarrollo local

Editá `text/src/environments/environment.ts` con tus valores reales:

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://tu-proyecto.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
};
```

> Angular no lee archivos `.env` en tiempo de build — `environment.ts` es la única fuente para desarrollo local.

Si preferís no commitear las credenciales reales, copiá `environment.local.ts` (ya está en `.gitignore`) y poné tus valores ahí. La anon key es pública por diseño, así que no es necesario, pero queda a tu criterio.

### Para producción (Vercel)

Andá al dashboard de tu proyecto en Vercel → **Settings** → **Environment Variables** y agregá:

| Nombre             | Valor                        |
| ------------------ | ---------------------------- |
| `SUPABASE_URL`     | La URL de tu proyecto        |
| `SUPABASE_ANON_KEY`| Tu anon public key           |

Al hacer deploy, el script `prebuild` (`scripts/generate-env.js`) inyecta automáticamente estas variables en `environment.ts` durante el build. No necesitás tocar nada — solo configurar las variables en el dashboard de Vercel.

> En Vercel las variables de entorno se configuran una sola vez y quedan disponibles en todos los deploys. Si necesitás valores distintos por entorno (preview vs production), podés configurarlos por separado en la misma pantalla.

## 4. Habilitar autenticación

### Email + contraseña

1. En el dashboard de Supabase, andá a **Authentication** → **Providers**.
2. Asegurate de que **Email** esté habilitado (ya viene por defecto).
3. Si querés que los usuarios se registren sin confirmar el email, desmarcá **"Confirm email"** en la configuración de Email.

### Google OAuth (opcional)

1. Andá a **Authentication** → **Providers** → **Google**.
2. Activá el toggle **Enabled**.
3. Necesitás un Client ID y Secret de Google:
   - Andá a [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Creá un proyecto (o usá uno existente)
   - Andá a **Credentials** → **Create Credentials** → **OAuth client ID**
   - Tipo: **Web application**
   - En **Authorized redirect URIs** agregá: `https://tu-proyecto.supabase.co/auth/v1/callback`
   - Copiá el Client ID y Client Secret al dashboard de Supabase
4. Guardá los cambios.

> Si Google OAuth no está habilitado en Supabase, el botón de Google va a fallar con "Unsupported provider". Podés dejarlo deshabilitado — la app muestra un mensaje de error claro, no rompe nada.

## 5. Crear la tabla de notas

Ejecutá este SQL en el SQL Editor de Supabase:

```sql
create table notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default '',
  description text not null default '',
  category text,
  priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  checklist jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Habilitar Row Level Security
alter table notes enable row level security;

-- Cada usuario solo puede leer/escribir sus propias notas
create policy "Users can manage their own notes"
  on notes for all
  using (auth.uid() = user_id);

-- Índice para consultas más rápidas
create index idx_notes_user_id on notes(user_id);
```

## 6. ¿Cómo funciona?

- **Sin login**: las notas se guardan en localStorage del navegador (como antes).
- **Con login**: las notas se sincronizan automáticamente con Supabase. Al hacer login por primera vez, tus notas locales se suben a la nube. Al hacer logout, las notas quedan en localStorage.
- El botón **Sign in** en la barra de navegación lleva a la página dedicada `/sign-in`.
- La página de autenticación tiene dos paneles: **Sign in** (izquierda) y **Create account** (derecha, con campo de username).
- Soporta login con email/contraseña y Google OAuth.
- En la barra de navegación se muestra el **username** (no el email) cuando estás logueado.
- Seguridad: contraseñas de mínimo 8 caracteres, RLS por usuario, mensajes de error genéricos.
