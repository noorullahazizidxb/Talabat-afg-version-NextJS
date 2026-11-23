// Node-only file — never import this from client-side code.
// The 'server-only' package cannot be used with the pages/ router.
import { promises as fs } from 'node:fs';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import {
  ThemeTokenFile,
  defaultThemeTokenFile,
  normalizeThemeTokenFile,
} from './theme-runtime';

export const THEME_TOKEN_FILE_PATH = path.join(
  process.cwd(),
  'src',
  'theme',
  'theme-tokens.json'
);

export async function readThemeTokenFile(): Promise<ThemeTokenFile> {
  try {
    const content = await fs.readFile(THEME_TOKEN_FILE_PATH, 'utf8');
    return normalizeThemeTokenFile(JSON.parse(content));
  } catch {
    return defaultThemeTokenFile;
  }
}

export function readThemeTokenFileSync(): ThemeTokenFile {
  try {
    const content = readFileSync(THEME_TOKEN_FILE_PATH, 'utf8');
    return normalizeThemeTokenFile(JSON.parse(content));
  } catch {
    return defaultThemeTokenFile;
  }
}

export async function writeThemeTokenFile(input: ThemeTokenFile): Promise<ThemeTokenFile> {
  const normalized = normalizeThemeTokenFile({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  await fs.writeFile(THEME_TOKEN_FILE_PATH, JSON.stringify(normalized, null, 2), 'utf8');

  return normalized;
}
