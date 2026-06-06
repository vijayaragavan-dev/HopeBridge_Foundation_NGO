/* ============================================
   HOPEBRIDGE FOUNDATION - Theme Switcher
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'hopebridge-theme';
  const THEMES = ['system', 'light', 'dark'];
  const ICONS = {
    light: 'fa-sun',
    dark: 'fa-moon',
    system: 'fa-desktop'
  };
  const LABELS = {
    light: 'Light mode',
    dark: 'Dark mode',
    system: 'System default'
  };

  let currentTheme = 'system';
  let resolvedTheme = 'light';

  const html = document.documentElement;
  let toggleBtn = null;
  let iconEl = null;

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && THEMES.includes(stored)) return stored;
    } catch (e) {}
    return 'system';
  }

  function storeTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function resolveTheme(theme) {
    return theme === 'system' ? getSystemTheme() : theme;
  }

  function applyTheme(theme) {
    const resolved = resolveTheme(theme);

    if (resolved === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }

    resolvedTheme = resolved;
    currentTheme = theme;
    updateButton();
  }

  function updateButton() {
    if (!toggleBtn || !iconEl) return;

    const icon = ICONS[currentTheme];
    iconEl.className = 'theme-icon fas ' + icon;
    toggleBtn.setAttribute('aria-label', LABELS[currentTheme]);

    const tooltip = toggleBtn.querySelector('.theme-tooltip');
    if (tooltip) {
      const modeLabel = currentTheme === 'system'
        ? 'System (' + LABELS[resolvedTheme] + ')'
        : LABELS[currentTheme];
      tooltip.textContent = modeLabel;
    }
  }

  function cycleTheme() {
    const idx = THEMES.indexOf(currentTheme);
    const next = THEMES[(idx + 1) % THEMES.length];
    storeTheme(next);
    applyTheme(next);
  }

  function init() {
    toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    iconEl = toggleBtn.querySelector('.theme-icon');
    if (!iconEl) return;

    const stored = getStoredTheme();
    applyTheme(stored);

    toggleBtn.addEventListener('click', cycleTheme);

    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMedia.addEventListener('change', function () {
      if (currentTheme === 'system') {
        applyTheme('system');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
