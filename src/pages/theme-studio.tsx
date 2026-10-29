'use client';

import Head from 'next/head';
import { useCallback, useMemo, useState } from 'react';

import { useThemeTokens } from '@/theme/ThemeTokensProvider';
import {
  EDITABLE_THEME_KEYS,
  ThemeCoreTokens,
  ThemeMode,
  ThemePreference,
  ThemePreset,
} from '@/theme/theme-runtime';

// ─── helpers ─────────────────────────────────────────────────────────────────

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function contrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#111' : '#fff';
}

// ─── sub-components ───────────────────────────────────────────────────────────

function PresetCard({
  preset,
  isActive,
  resolvedMode,
  onSelect,
}: {
  preset: ThemePreset;
  isActive: boolean;
  resolvedMode: ThemeMode;
  onSelect: () => void;
}) {
  const t = preset.modes[resolvedMode];
  const swatchKeys: Array<keyof ThemeCoreTokens> = [
    'primary', 'accent', 'secondary', 'background', 'surface', 'text',
  ];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'rounded-2xl border-2 p-4 text-left transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2',
        isActive
          ? 'border-[var(--theme-primary)] shadow-md ring-2 ring-[var(--theme-ring)]'
          : 'border-[var(--theme-border)] hover:border-[var(--theme-primary)]',
      ].join(' ')}
      style={{ background: t.surface, color: t.text }}
    >
      {/* swatch row */}
      <div className="mb-3 flex gap-1.5">
        {swatchKeys.map((k) => (
          <span
            key={k}
            title={k}
            className="h-5 w-5 flex-none rounded-full ring-1 ring-black/10"
            style={{ background: t[k] }}
          />
        ))}
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-widest opacity-60">
        {preset.inspiredBy}
      </p>
      <p className="mt-0.5 text-sm font-semibold leading-tight">{preset.name}</p>
      <p className="mt-1 text-[11px] leading-snug opacity-60">{preset.description}</p>

      {/* brand gradient strip */}
      <div
        className="mt-3 h-1.5 w-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${t.brandStart}, ${t.brandEnd})` }}
      />
    </button>
  );
}

function TokenRow({
  entry,
  value,
  onChange,
}: {
  entry: { key: keyof ThemeCoreTokens; label: string };
  value: string;
  onChange: (key: keyof ThemeCoreTokens, v: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <label
      className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] px-3 py-2.5 transition-shadow hover:shadow-sm"
    >
      {/* colour swatch + native picker */}
      <span
        className="relative h-8 w-8 flex-none cursor-pointer overflow-hidden rounded-lg ring-1 ring-black/10 transition-transform hover:scale-110"
        style={{ background: value }}
      >
        <input
          aria-label={entry.label}
          type="color"
          value={value}
          onChange={(e) => onChange(entry.key, e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </span>

      <div className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-none">{entry.label}</span>
        <button
          type="button"
          title="Copy hex value"
          onClick={handleCopy}
          className="mt-0.5 block font-mono text-[11px] opacity-55 hover:opacity-100 transition-opacity text-left"
        >
          {copied ? '✓ copied' : value}
        </button>
      </div>

      {/* text preview chip */}
      <span
        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
        style={{ background: value, color: contrastText(value) }}
      >
        Aa
      </span>
    </label>
  );
}

function TokenGroup({
  title,
  items,
  tokens,
  onChange,
}: {
  title: string;
  items: Array<{ key: keyof ThemeCoreTokens; label: string }>;
  tokens: ThemeCoreTokens;
  onChange: (key: keyof ThemeCoreTokens, v: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest opacity-60">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <TokenRow key={item.key} entry={item} value={tokens[item.key]} onChange={onChange} />
        ))}
      </div>
    </section>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function ThemeStudioPage() {
  const {
    themeFile,
    presetId,
    modePreference,
    resolvedMode,
    activeTokens,
    isSaving,
    lastSavedAt,
    setPresetId,
    setModePreference,
    updateToken,
    clearOverrides,
    reloadFromFile,
    saveToFile,
  } = useThemeTokens();

  const [status, setStatus] = useState('');
  const [tab, setTab] = useState<'presets' | 'tokens'>('presets');

  const modes: ThemePreference[] = ['light', 'dark', 'system'];

  const groups = useMemo(
    () => ({
      surface: EDITABLE_THEME_KEYS.filter((e) =>
        ['background', 'surface', 'surfaceElevated', 'text', 'textMuted', 'border'].includes(e.key)
      ),
      brand: EDITABLE_THEME_KEYS.filter((e) =>
        ['primary', 'secondary', 'accent', 'ring', 'brandStart', 'brandEnd'].includes(e.key)
      ),
      semantic: EDITABLE_THEME_KEYS.filter((e) =>
        ['success', 'warning', 'danger'].includes(e.key)
      ),
    }),
    []
  );

  const onTokenChange = useCallback(
    (key: keyof ThemeCoreTokens, v: string) => updateToken(key, v, resolvedMode as ThemeMode),
    [updateToken, resolvedMode]
  );

  const handleSave = async () => {
    setStatus('Saving…');
    try {
      await saveToFile();
      setStatus('Saved to src/theme/theme-tokens.json ✓');
    } catch {
      setStatus('Save failed — check server logs.');
    }
  };

  const handleReload = async () => {
    setStatus('Reloading…');
    try {
      await reloadFromFile();
      setStatus('Reloaded from file ✓');
    } catch {
      setStatus('Reload failed.');
    }
  };

  return (
    <>
      <Head>
        <title>Theme Tokens Studio · Talabat AFG</title>
      </Head>

      <div
        className="min-h-screen transition-colors"
        style={{ background: 'var(--theme-background)', color: 'var(--theme-text)' }}
      >
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

          {/* ── header ── */}
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-50">
                Talabat AFG
              </p>
              <h1 className="mt-1 text-3xl font-bold">Theme Tokens Studio</h1>
              <p className="mt-1 text-sm opacity-60">
                Edit presets in real-time · Persist to file · Zero-FOUC bootstrap
              </p>
            </div>

            {/* action bar */}
            <div className="flex flex-wrap items-center gap-2">
              {/* mode picker */}
              <div className="flex rounded-lg border border-[var(--theme-border)] overflow-hidden text-sm">
                {modes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModePreference(m)}
                    className={[
                      'px-3 py-1.5 font-medium transition-colors',
                      modePreference === m
                        ? 'bg-[var(--theme-primary)] text-white'
                        : 'hover:bg-[var(--theme-surface-elevated)]',
                    ].join(' ')}
                  >
                    {cap(m)}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-lg bg-[var(--theme-primary)] px-4 py-1.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              >
                {isSaving ? 'Saving…' : 'Save to File'}
              </button>
              <button
                type="button"
                onClick={handleReload}
                className="rounded-lg border border-[var(--theme-border)] px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-[var(--theme-surface-elevated)]"
              >
                Reload
              </button>
              <button
                type="button"
                onClick={() => { clearOverrides(); setStatus('Draft cleared ✓'); }}
                className="rounded-lg border border-[var(--theme-border)] px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-[var(--theme-surface-elevated)]"
              >
                Reset Draft
              </button>
            </div>
          </header>

          {/* status bar */}
          {status && (
            <p className="mb-4 rounded-lg bg-[var(--theme-surface)] px-4 py-2 text-sm font-medium border border-[var(--theme-border)]">
              {status}
              {lastSavedAt && <span className="ml-3 opacity-50">Last saved: {lastSavedAt}</span>}
            </p>
          )}

          {/* ── tabs ── */}
          <div className="mb-6 flex gap-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-1 w-fit">
            {(['presets', 'tokens'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={[
                  'rounded-lg px-5 py-2 text-sm font-semibold transition-colors',
                  tab === t
                    ? 'bg-[var(--theme-primary)] text-white shadow'
                    : 'hover:bg-[var(--theme-surface-elevated)]',
                ].join(' ')}
              >
                {cap(t)}
              </button>
            ))}
          </div>

          {/* ── presets tab ── */}
          {tab === 'presets' && (
            <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
              {/* preset grid */}
              <div>
                <p className="mb-4 text-sm opacity-60">
                  {themeFile.presets.length} presets · click to activate
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {themeFile.presets.map((preset) => (
                    <PresetCard
                      key={preset.id}
                      preset={preset}
                      isActive={preset.id === presetId}
                      resolvedMode={resolvedMode}
                      onSelect={() => setPresetId(preset.id)}
                    />
                  ))}
                </div>
              </div>

              {/* live preview panel */}
              <LivePreviewPanel tokens={activeTokens} presetName={themeFile.presets.find(p => p.id === presetId)?.name ?? ''} />
            </div>
          )}

          {/* ── tokens tab ── */}
          {tab === 'tokens' && (
            <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
              <div className="space-y-5">
                {/* Active mode badge — makes clear which mode is being edited */}
                <div className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-2.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: resolvedMode === 'dark' ? '#4f87ff' : '#ff8a1f' }}
                  />
                  <span className="text-sm font-medium">
                    Editing <strong className="capitalize">{resolvedMode}</strong> mode tokens
                  </span>
                  <span className="ml-auto text-xs opacity-50">
                    Changes apply instantly · use Save to persist
                  </span>
                </div>

                <TokenGroup title="Surface & Text" items={groups.surface} tokens={activeTokens} onChange={onTokenChange} />
                <TokenGroup title="Brand Colours" items={groups.brand} tokens={activeTokens} onChange={onTokenChange} />
                <TokenGroup title="Semantic States" items={groups.semantic} tokens={activeTokens} onChange={onTokenChange} />
              </div>

              <LivePreviewPanel tokens={activeTokens} presetName={themeFile.presets.find(p => p.id === presetId)?.name ?? ''} />
            </div>
          )}

        </div>
      </div>
    </>
  );
}

// ─── live preview panel ───────────────────────────────────────────────────────

function LivePreviewPanel({ tokens, presetName }: { tokens: ThemeCoreTokens; presetName: string }) {
  return (
    <aside
      className="sticky top-6 h-fit rounded-2xl border border-[var(--theme-border)] p-5"
      style={{ background: tokens.surface, color: tokens.text }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-50">Live Preview</p>
      <h2 className="mt-1 text-lg font-bold leading-tight">{presetName || 'Active Preset'}</h2>

      {/* hero gradient */}
      <div
        className="mt-4 rounded-xl p-5"
        style={{ background: `linear-gradient(135deg, ${tokens.brandStart}, ${tokens.brandEnd})` }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Brand Hero
        </p>
        <p className="mt-1 text-xl font-bold text-white">Talabat AFG</p>
        <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
          Order with elite precision.
        </p>
        <button
          type="button"
          className="mt-4 rounded-full px-4 py-1.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', backdropFilter: 'blur(8px)' }}
        >
          Order now
        </button>
      </div>

      {/* action buttons */}
      <div className="mt-4 grid gap-2">
        {[
          { label: 'Primary Action', bg: tokens.primary },
          { label: 'Accent Action', bg: tokens.accent },
          { label: 'Secondary', bg: tokens.secondary },
        ].map(({ label, bg }) => (
          <button
            key={label}
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: bg, color: contrastText(bg) }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* semantic badges */}
      <div className="mt-4 rounded-xl p-3" style={{ background: tokens.background }}>
        <p className="mb-2 text-xs font-semibold opacity-60">Semantic States</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'success', bg: tokens.success },
            { label: 'warning', bg: tokens.warning },
            { label: 'danger', bg: tokens.danger },
          ].map(({ label, bg }) => (
            <span
              key={label}
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: bg, color: contrastText(bg) }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* surface stack */}
      <div className="mt-4 space-y-1.5">
        {([
          ['Background', tokens.background],
          ['Surface', tokens.surface],
          ['Surface Elevated', tokens.surfaceElevated],
        ] as const).map(([label, bg]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs"
            style={{ background: bg, color: tokens.text, border: `1px solid ${tokens.border}` }}
          >
            <span className="font-medium">{label}</span>
            <span className="font-mono opacity-55">{bg}</span>
          </div>
        ))}
      </div>

      {/* typography scale */}
      <div className="mt-4 rounded-xl p-3" style={{ background: tokens.background, border: `1px solid ${tokens.border}` }}>
        <p className="text-2xl font-bold leading-tight" style={{ color: tokens.text }}>Heading Xl</p>
        <p className="mt-1 text-base font-medium" style={{ color: tokens.text }}>Body Regular</p>
        <p className="mt-1 text-sm" style={{ color: tokens.textMuted }}>Muted label text here</p>
        <p className="mt-1 font-mono text-xs" style={{ color: tokens.textMuted }}>#monospace-detail</p>
      </div>
    </aside>
  );
}
