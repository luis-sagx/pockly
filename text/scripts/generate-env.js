const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
const localPath = path.join(__dirname, '..', 'src', 'environments', 'environment.local.ts');

// ── Vercel: usar variables de entorno ──
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (url && key) {
  const content = `export const environment = {
  production: true,
  supabaseUrl: '${url}',
  supabaseAnonKey: '${key}',
};
`;
  fs.writeFileSync(envPath, content);
  console.log('✅ Generated environment.ts from Vercel env vars');
  return;
}

// ── Desarrollo local: copiar environment.local.ts si existe ──
if (fs.existsSync(localPath)) {
  fs.copyFileSync(localPath, envPath);
  console.log('✅ Copied environment.local.ts → environment.ts');
} else {
  console.log('⚠️  Create src/environments/environment.local.ts with your real credentials');
}
