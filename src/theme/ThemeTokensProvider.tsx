'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  EMPTY_OVERRIDES,
  ThemeCoreTokens,
  ThemeMode,
  ThemeOverrides,
  ThemePreference,
  ThemeTokenFile,
  ThemeRuntimeStorage,
  THEME_RUNTIME_STORAGE_KEY,
  applyThemeToDocument,
  defaultThemeTokenFile,
  getPresetById,
  mergeTokens,
  normalizeThemeTokenFile,
  parseRuntimeStorage,
  resolveMode,
} from './theme-runtime';

interface ThemeTokensContextValue {
  themeFile: ThemeTokenFile;
  presetId: string;
  modePreference: ThemePreference;
  resolvedMode: ThemeMode;
  activeTokens: ThemeCoreTokens;
  overrides: ThemeOverrides;
  isSaving: boolean;
  lastSavedAt: string | null;
  setPresetId: (presetId: string) => void;
  setModePreference: (mode: ThemePreference) => void;
  updateToken: (key: keyof ThemeCoreTokens, value: string, mode?: ThemeMode) => void;
  clearOverrides: () => void;
  reloadFromFile: () => Promise<void>;
  saveToFile: () => Promise<void>;
}

const ThemeTokensContext = createContext<ThemeTokensContextValue | null>(null);

function loadBootstrapState(): {
  themeFile: ThemeTokenFile;
  runtimeStorage: ThemeRuntimeStorage;
} {
  if (typeof window === 'undefined') {
    return {
      themeFile: defaultThemeTokenFile,
      runtimeStorage: {
        presetId: defaultThemeTokenFile.activePresetId,
        mode: defaultThemeTokenFile.mode,
        overrides: { ...EMPTY_OVERRIDES },
      },
    };
  }

  const bootstrap = window.__TALABAT_THEME_BOOTSTRAP__;
  const bootstrapFile = bootstrap?.themeFile
    ? normalizeThemeTokenFile(bootstrap.themeFile)
    : defaultThemeTokenFile;

  const bootstrapStorage = parseRuntimeStorage({
    presetId: bootstrap?.selection?.presetId,
    mode: bootstrap?.selection?.mode,
    overrides: bootstrap?.overrides,
  });

  return {
    themeFile: bootstrapFile,
    runtimeStorage: bootstrapStorage,
  };
}

export function ThemeTokensProvider({
  children,
  initialThemeFile,
}: {
  children: ReactNode;
  initialThemeFile?: ThemeTokenFile;
}) {
  const bootstrapState = loadBootstrapState();

  const [themeFile, setThemeFile] = useState<ThemeTokenFile>(() =>
    normalizeThemeTokenFile(initialThemeFile ?? bootstrapState.themeFile)
  );

  const [presetId, setPresetId] = useState<string>(() => {
    const preferredPreset = bootstrapState.runtimeStorage.presetId;
    const fromInitialFile = initialThemeFile ? normalizeThemeTokenFile(initialThemeFile) : null;
    const source = fromInitialFile ?? bootstrapState.themeFile;

    return source.presets.some((preset) => preset.id === preferredPreset)
      ? preferredPreset
      : source.activePresetId;
  });

  const [modePreference, setModePreference] = useState<ThemePreference>(
    bootstrapState.runtimeStorage.mode
  );

  const [overrides, setOverrides] = useState<ThemeOverrides>(() => ({
    light: bootstrapState.runtimeStorage.overrides.light ?? {},
    dark: bootstrapState.runtimeStorage.overrides.dark ?? {},
  }));

  const [prefersDarkSystem, setPrefersDarkSystem] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDarkSystem(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const resolvedMode = useMemo(
    () => resolveMode(modePreference, prefersDarkSystem),
    [modePreference, prefersDarkSystem]
  );

  const activePreset = useMemo(
    () => getPresetById(themeFile, presetId),
    [themeFile, presetId]
  );

  const activeTokens = useMemo(
    () => mergeTokens(activePreset.modes[resolvedMode], overrides[resolvedMode] ?? {}),
    [activePreset, overrides, resolvedMode]
  );

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    applyThemeToDocument(document, activeTokens, resolvedMode, activePreset.id);
  }, [activePreset.id, activeTokens, resolvedMode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextStorage: ThemeRuntimeStorage = {
      presetId: activePreset.id,
      mode: modePreference,
      overrides,
    };

    window.localStorage.setItem(THEME_RUNTIME_STORAGE_KEY, JSON.stringify(nextStorage));
  }, [activePreset.id, modePreference, overrides]);

  const updateToken = useCallback(
    (key: keyof ThemeCoreTokens, value: string, mode?: ThemeMode) => {
      const targetMode = mode ?? resolvedMode;
      setOverrides((previous) => ({
        ...previous,
        [targetMode]: {
          ...previous[targetMode],
          [key]: value,
        },
      }));
    },
    [resolvedMode]
  );

  const clearOverrides = useCallback(() => {
    setOverrides({
      light: {},
      dark: {},
    });
  }, []);

  const reloadFromFile = useCallback(async () => {
    const response = await fetch('/api/theme-tokens', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to reload theme tokens from file.');
    }

    const nextThemeFile = normalizeThemeTokenFile(await response.json());
    setThemeFile(nextThemeFile);
    setPresetId(nextThemeFile.activePresetId);
    setModePreference(nextThemeFile.mode);
    setOverrides({
      light: {},
      dark: {},
    });
    setLastSavedAt(nextThemeFile.updatedAt);
  }, []);

  const saveToFile = useCallback(async () => {
    setIsSaving(true);

    try {
      const updatedPresets = themeFile.presets.map((preset) => {
        if (preset.id !== activePreset.id) {
          return preset;
        }

        return {
          ...preset,
          modes: {
            light: mergeTokens(preset.modes.light, overrides.light ?? {}),
            dark: mergeTokens(preset.modes.dark, overrides.dark ?? {}),
          },
        };
      });

      const payload: ThemeTokenFile = {
        ...themeFile,
        activePresetId: activePreset.id,
        mode: modePreference,
        presets: updatedPresets,
      };

      const response = await fetch('/api/theme-tokens', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to persist theme tokens.');
      }

      const nextThemeFile = normalizeThemeTokenFile(await response.json());
      setThemeFile(nextThemeFile);
      setOverrides({
        light: {},
        dark: {},
      });
      setLastSavedAt(nextThemeFile.updatedAt);
    } finally {
      setIsSaving(false);
    }
  }, [activePreset.id, modePreference, overrides, themeFile]);

  const contextValue = useMemo<ThemeTokensContextValue>(
    () => ({
      themeFile,
      presetId: activePreset.id,
      modePreference,
      resolvedMode,
      activeTokens,
      overrides,
      isSaving,
      lastSavedAt,
      setPresetId,
      setModePreference,
      updateToken,
      clearOverrides,
      reloadFromFile,
      saveToFile,
    }),
    [
      activePreset.id,
      activeTokens,
      clearOverrides,
      isSaving,
      lastSavedAt,
      modePreference,
      overrides,
      reloadFromFile,
      resolvedMode,
      saveToFile,
      setModePreference,
      setPresetId,
      themeFile,
      updateToken,
    ]
  );

  return (
    <ThemeTokensContext.Provider value={contextValue}>
      {children}
    </ThemeTokensContext.Provider>
  );
}

export function useThemeTokens(): ThemeTokensContextValue {
  const context = useContext(ThemeTokensContext);

  if (!context) {
    throw new Error('useThemeTokens must be used inside ThemeTokensProvider.');
  }

  return context;
}
