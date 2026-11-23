import type { NextApiRequest, NextApiResponse } from 'next';

import {
  ThemeTokenFile,
  normalizeThemeTokenFile,
} from '@/theme/theme-runtime';
import {
  readThemeTokenFile,
  writeThemeTokenFile,
} from '@/theme/theme-token-server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ThemeTokenFile | { error: string }>
): Promise<void> {
  if (req.method === 'GET') {
    const file = await readThemeTokenFile();
    res.status(200).json(file);
    return;
  }

  if (req.method === 'PUT') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const normalized = normalizeThemeTokenFile(payload);
      const saved = await writeThemeTokenFile(normalized);
      res.status(200).json(saved);
    } catch {
      res.status(400).json({
        error: 'Invalid theme token payload.',
      });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).json({
    error: 'Method not allowed.',
  });
}
