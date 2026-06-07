const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
const localPath = path.join(__dirname, '..', 'src', 'environments', 'environment.local.ts');

function writeEnv({ url, key, production }) {
  const content = `export const environment = {
  production: ${production},
  supabaseUrl: '${url}',
  supabaseAnonKey: '${key}',
};
`;
  fs.writeFileSync(envPath, content);
}

// ── Vercel: usar variables de entorno ──
const vUrl = process.env.SUPABASE_URL;
const vKey = process.env.SUPABASE_ANON_KEY;

if (vUrl && vKey) {
  writeEnv({ url: vUrl, key: vKey, production: true });
  console.log('✅ Generated environment.ts from Vercel env vars');
  return;
}

// ── Desarrollo local: leer environment.local.ts ──
if (fs.existsSync(localPath)) {
  const raw = fs.readFileSync(localPath, 'utf-8');

  // Extraer valores con regex (ignora comentarios, espacios, formato)
  const urlMatch = raw.match(/supabaseUrl\s*:\s*['"]([^'"]+)['"]/);
  const keyMatch = raw.match(/supabaseAnonKey\s*:\s*['"]([^'"]+)['"]/);

  if (urlMatch && keyMatch && urlMatch[1] !== 'your-project.supabase.co' && keyMatch[1] !== 'your-anon-key') {
    writeEnv({ url: urlMatch[1], key: keyMatch[1], production: false });
    console.log('✅ Generated environment.ts from environment.local.ts');
    return;
  }

  console.log('⚠️  environment.local.ts has placeholder values — fill in your real credentials');
  return;
}

console.log('⚠️  Create src/environments/environment.local.ts with your real Supabase credentials');
