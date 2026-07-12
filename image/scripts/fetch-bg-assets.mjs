#!/usr/bin/env node
// Downloads the self-hosted assets for the background remover so nothing is
// fetched from a third-party CDN at runtime:
//   - onnxruntime-web WASM/glue files -> public/ort/
//   - ormbg (Apache-2.0) model files   -> public/models/onnx-community/ormbg-ONNX/
//
// Runs automatically before `ng build` via the "prebuild" npm script.
// Already-downloaded files are skipped, so repeat builds are fast.

import { mkdir, stat, rename, readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

// Keep the WASM version identical to the onnxruntime-web that transformers.js
// bundles, otherwise the runtime and the binaries mismatch and crash.
// (package.json subpath isn't exported, so read the file directly.)
const transformersPkg = JSON.parse(
  await readFile(
    resolve(__dirname, '..', 'node_modules/@huggingface/transformers/package.json'),
    'utf8',
  ),
);
const ORT_VERSION = transformersPkg.dependencies['onnxruntime-web'].replace(
  /^[^\d]*/,
  '',
);

const ORT_BASE = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/dist`;
const ORT_FILES = [
  'ort-wasm-simd-threaded.mjs',
  'ort-wasm-simd-threaded.wasm',
  'ort-wasm-simd-threaded.asyncify.mjs',
  'ort-wasm-simd-threaded.asyncify.wasm',
  'ort-wasm-simd-threaded.jsep.mjs',
  'ort-wasm-simd-threaded.jsep.wasm',
];

const MODEL_ID = 'onnx-community/ormbg-ONNX';
const MODEL_BASE = `https://huggingface.co/${MODEL_ID}/resolve/main`;
// q8 ("_quantized" suffix, ~44 MB) — transformers.js's own recommended dtype
// for the WASM backend. Far lighter on memory than fp32 during inference,
// which is what the app requests (see background-remover.ts).
const MODEL_FILES = [
  'config.json',
  'preprocessor_config.json',
  'onnx/model_quantized.onnx',
];

async function exists(path) {
  try {
    const s = await stat(path);
    return s.size > 0;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  if (await exists(dest)) {
    console.log(`  skip (exists): ${dest.replace(publicDir, 'public')}`);
    return;
  }
  await mkdir(dirname(dest), { recursive: true });
  const tmp = `${dest}.download`;
  console.log(`  fetching: ${url}`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok || !res.body) {
    throw new Error(`Failed ${res.status} ${res.statusText} for ${url}`);
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(tmp));
  await rename(tmp, dest);
}

async function main() {
  console.log(`Background-remover assets (onnxruntime-web ${ORT_VERSION})`);

  console.log('onnxruntime-web runtime -> public/ort/');
  for (const f of ORT_FILES) {
    await download(`${ORT_BASE}/${f}`, join(publicDir, 'ort', f));
  }

  console.log(`model ${MODEL_ID} -> public/models/`);
  for (const f of MODEL_FILES) {
    await download(
      `${MODEL_BASE}/${f}`,
      join(publicDir, 'models', MODEL_ID, f),
    );
  }

  console.log('Done.');
}

main().catch((err) => {
  // Temp files use a .download suffix and are renamed only on full success,
  // so a failed run never leaves a partial file in place.
  console.error(`\nAsset download failed: ${err.message}`);
  process.exit(1);
});
