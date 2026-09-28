import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'claudete-theme';
  readonly theme = signal<Theme>(this.initialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.dataset['bsTheme'] = theme;
      if (isPlatformBrowser(this.platformId)) {
        try {
          localStorage.setItem(this.storageKey, theme);
        } catch {
          /* Keep the chosen theme for this visit. */
        }
      }
    });
  }

  toggle(): void {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private initialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) return 'light';
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(this.storageKey);
    } catch {
      /* Use the system preference. */
    }
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
