import themeTokensData from './theme-tokens.json';

export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';

export interface ThemeCoreTokens {
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  ring: string;
  brandStart: string;
  brandEnd: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  inspiredBy: string;
  modes: Record<ThemeMode, ThemeCoreTokens>;
}

export interface ThemeTokenFile {
  version: number;
  updatedAt: string;
  activePresetId: string;
  mode: ThemePreference;
  presets: ThemePreset[];
}

export interface ThemeRuntimeStorage {
  presetId: string;
  mode: ThemePreference;
  overrides: ThemeOverrides;
}

export type ThemeOverrides = Record<ThemeMode, Partial<ThemeCoreTokens>>;

export interface ThemeBootstrapState {
  themeFile: ThemeTokenFile;
  selection: {
    presetId: string;
    mode: ThemePreference;
  };
  overrides: ThemeOverrides;
}

declare global {
  interface Window {
    __TALABAT_THEME_BOOTSTRAP__?: ThemeBootstrapState;
  }
}

export const THEME_RUNTIME_STORAGE_KEY = 'talabat.theme.runtime.v1';

export const EMPTY_OVERRIDES: ThemeOverrides = {
  light: {},
  dark: {},
};

export const EDITABLE_THEME_KEYS: Array<{
  key: keyof ThemeCoreTokens;
  label: string;
}> = [
  { key: 'background', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'surfaceElevated', label: 'Surface Elevated' },
  { key: 'text', label: 'Text' },
  { key: 'textMuted', label: 'Text Muted' },
  { key: 'border', label: 'Border' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'danger', label: 'Danger' },
  { key: 'ring', label: 'Ring' },
  { key: 'brandStart', label: 'Brand Gradient Start' },
  { key: 'brandEnd', label: 'Brand Gradient End' },
];

export const THEME_TOKEN_VARIABLE_MAP: Record<keyof ThemeCoreTokens, string> = {
  background: '--theme-background',
  surface: '--theme-surface',
  surfaceElevated: '--theme-surface-elevated',
  text: '--theme-text',
  textMuted: '--theme-text-muted',
  border: '--theme-border',
  primary: '--theme-primary',
  secondary: '--theme-secondary',
  accent: '--theme-accent',
  success: '--theme-success',
  warning: '--theme-warning',
  danger: '--theme-danger',
  ring: '--theme-ring',
  brandStart: '--theme-brand-start',
  brandEnd: '--theme-brand-end',
};

const FALLBACK_CORE_TOKENS: ThemeCoreTokens = {
  background: '#f7f9fd',
  surface: '#ffffff',
  surfaceElevated: '#fff6ec',
  text: '#090b12',
  textMuted: '#5b6679',
  border: '#dfe5ef',
  primary: '#ff8a1f',
  secondary: '#4a546f',
  accent: '#ffbe0b',
  success: '#00a77b',
  warning: '#ff9b3d',
  danger: '#ea5656',
  ring: '#ff8a1f',
  brandStart: '#ffbe0b',
  brandEnd: '#ff6a00',
};

export function resolveMode(mode: ThemePreference, prefersDark: boolean): ThemeMode {
  if (mode === 'system') {
    return prefersDark ? 'dark' : 'light';
  }

  return mode;
}

export function normalizeThemeTokenFile(input: unknown): ThemeTokenFile {
  if (!input || typeof input !== 'object') {
    return {
      version: 1,
      updatedAt: new Date().toISOString(),
      activePresetId: 'fallback',
      mode: 'system',
      presets: [
        {
          id: 'fallback',
          name: 'Fallback',
          description: 'Auto-generated fallback palette',
          inspiredBy: 'runtime fallback',
          modes: {
            light: { ...FALLBACK_CORE_TOKENS },
            dark: {
              ...FALLBACK_CORE_TOKENS,
              background: '#0f1117',
              surface: '#181c25',
              surfaceElevated: '#1d2430',
              text: '#edf0f8',
              textMuted: '#a0abc0',
              border: '#2d3648',
            },
          },
        },
      ],
    };
  }

  const source = input as Partial<ThemeTokenFile>;
  const presets = Array.isArray(source.presets) && source.presets.length > 0
    ? source.presets
    : [
        {
          id: 'fallback',
          name: 'Fallback',
          description: 'Auto-generated fallback palette',
          inspiredBy: 'runtime fallback',
          modes: {
            light: { ...FALLBACK_CORE_TOKENS },
            dark: {
              ...FALLBACK_CORE_TOKENS,
              background: '#0f1117',
              surface: '#181c25',
              surfaceElevated: '#1d2430',
              text: '#edf0f8',
              textMuted: '#a0abc0',
              border: '#2d3648',
            },
          },
        },
      ];

  const normalizedPresets = presets.map((preset, index) => {
    const safePreset = (preset ?? {}) as Partial<ThemePreset>;
    const safeLight = mergeTokens(FALLBACK_CORE_TOKENS, safePreset.modes?.light ?? {});
    const safeDark = mergeTokens(
      {
        ...FALLBACK_CORE_TOKENS,
        background: '#0f1117',
        surface: '#181c25',
        surfaceElevated: '#1d2430',
        text: '#edf0f8',
        textMuted: '#a0abc0',
        border: '#2d3648',
      },
      safePreset.modes?.dark ?? {}
    );

    return {
      id: safePreset.id?.trim() || `preset-${index + 1}`,
      name: safePreset.name?.trim() || `Preset ${index + 1}`,
      description: safePreset.description?.trim() || 'Generated preset',
      inspiredBy: safePreset.inspiredBy?.trim() || 'Unknown',
      modes: {
        light: safeLight,
        dark: safeDark,
      },
    };
  });

  const activePresetId = normalizedPresets.some((preset) => preset.id === source.activePresetId)
    ? (source.activePresetId as string)
    : normalizedPresets[0].id;

  const mode: ThemePreference =
    source.mode === 'light' || source.mode === 'dark' || source.mode === 'system'
      ? source.mode
      : 'system';

  return {
    version: Number(source.version ?? 1),
    updatedAt: source.updatedAt || new Date().toISOString(),
    activePresetId,
    mode,
    presets: normalizedPresets,
  };
}

export const defaultThemeTokenFile = normalizeThemeTokenFile(themeTokensData);

export function mergeTokens(
  baseTokens: ThemeCoreTokens,
  overrideTokens: Partial<ThemeCoreTokens>
): ThemeCoreTokens {
  return {
    ...baseTokens,
    ...overrideTokens,
  };
}

export function getPresetById(themeFile: ThemeTokenFile, presetId: string): ThemePreset {
  return (
    themeFile.presets.find((preset) => preset.id === presetId) ??
    themeFile.presets[0]
  );
}

export function applyThemeToDocument(
  doc: Document,
  tokens: ThemeCoreTokens,
  mode: ThemeMode,
  presetId: string
): void {
  const root = doc.documentElement;

  Object.entries(THEME_TOKEN_VARIABLE_MAP).forEach(([key, variableName]) => {
    const tokenValue = tokens[key as keyof ThemeCoreTokens];
    root.style.setProperty(variableName, tokenValue);
  });

  root.dataset.themeMode = mode;
  root.dataset.themePreset = presetId;
  root.classList.remove('light', 'dark');
  root.classList.add(mode);
}

export function parseRuntimeStorage(input: unknown): ThemeRuntimeStorage {
  if (!input || typeof input !== 'object') {
    return {
      presetId: defaultThemeTokenFile.activePresetId,
      mode: defaultThemeTokenFile.mode,
      overrides: { ...EMPTY_OVERRIDES },
    };
  }

  const data = input as Partial<ThemeRuntimeStorage>;
  const mode: ThemePreference =
    data.mode === 'light' || data.mode === 'dark' || data.mode === 'system'
      ? data.mode
      : defaultThemeTokenFile.mode;

  return {
    presetId: typeof data.presetId === 'string' ? data.presetId : defaultThemeTokenFile.activePresetId,
    mode,
    overrides: {
      light: data.overrides?.light ?? {},
      dark: data.overrides?.dark ?? {},
    },
  };
}

export function createThemeBootstrapScript(themeFile: ThemeTokenFile): string {
  const safeThemeFile = JSON.stringify(normalizeThemeTokenFile(themeFile)).replace(/</g, '\\u003c');
  const variableMap = JSON.stringify(THEME_TOKEN_VARIABLE_MAP).replace(/</g, '\\u003c');

  return `
(function () {
  try {
    var runtimeStorageKey = ${JSON.stringify(THEME_RUNTIME_STORAGE_KEY)};
    var tokenVariableMap = ${variableMap};
    var file = ${safeThemeFile};

    var storageRaw = window.localStorage.getItem(runtimeStorageKey);
    var storage = storageRaw ? JSON.parse(storageRaw) : null;

    var mode = storage && (storage.mode === 'light' || storage.mode === 'dark' || storage.mode === 'system')
      ? storage.mode
      : file.mode;

    var presetId = storage && typeof storage.presetId === 'string'
      ? storage.presetId
      : file.activePresetId;

    var preset = file.presets.find(function (entry) {
      return entry.id === presetId;
    }) || file.presets[0];

    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolvedMode = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;

    var modeTokens = (preset.modes && preset.modes[resolvedMode]) || preset.modes.light;
    var overrides = storage && storage.overrides && storage.overrides[resolvedMode]
      ? storage.overrides[resolvedMode]
      : {};

    var mergedTokens = Object.assign({}, modeTokens, overrides);
    var root = document.documentElement;

    Object.keys(tokenVariableMap).forEach(function (tokenKey) {
      var cssVar = tokenVariableMap[tokenKey];
      var value = mergedTokens[tokenKey];
      if (value) {
        root.style.setProperty(cssVar, value);
      }
    });

    root.dataset.themeMode = resolvedMode;
    root.dataset.themePreset = preset.id;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedMode);

    window.__TALABAT_THEME_BOOTSTRAP__ = {
      themeFile: file,
      selection: {
        presetId: preset.id,
        mode: mode,
      },
      overrides: storage && storage.overrides
        ? storage.overrides
        : {
            light: {},
            dark: {},
          },
    };
  } catch (_error) {
    // Keep the page rendering even if theme bootstrap fails.
  }
})();`.trim();
}
