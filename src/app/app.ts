import { Component, inject, signal } from '@angular/core';
import { ThemeService } from './core/theme.service';

interface Therapy {
  readonly number: string;
  readonly name: string;
  readonly description: string;
  readonly symbol: string;
}

@Component({ selector: 'app-root', templateUrl: './app.html', styleUrl: './app.scss' })
export class App {
  readonly themeService = inject(ThemeService);
  readonly menuOpen = signal(false);
  readonly phone = '5551993930667';
  readonly year = new Date().getFullYear();
  readonly therapies: readonly Therapy[] = [
    {
      number: '01',
      name: 'Acupuntura',
      description: 'Uma prática milenar que busca favorecer o equilíbrio e o bem-estar integral.',
      symbol: '✳',
    },
    {
      number: '02',
      name: 'Auriculoterapia',
      description:
        'Cuidado delicado que utiliza pontos específicos da orelha como parte do atendimento.',
      symbol: '◉',
    },
    {
      number: '03',
      name: 'Cone Hindu',
      description: 'Um momento de cuidado e relaxamento dedicado à região da cabeça e dos ouvidos, com equilíbrio dos chacras.',
      symbol: '◒',
    },
    {
      number: '04',
      name: 'Reflexologia',
      description: 'Toques em pontos reflexos dos pés para uma pausa de conexão e tranquilidade.',
      symbol: '❋',
    },
    {
      number: '05',
      name: 'Reiki',
      description: 'Uma prática integrativa que convida ao relaxamento e à harmonia interior.',
      symbol: '✺',
    },
    {
      number: '06',
      name: 'Ventosa',
      description: 'Técnica tradicional incorporada a um atendimento individual e acolhedor.',
      symbol: '◌',
    },
  ];

  whatsapp(message: string): string {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  }

  therapyMessage(name: string): string {
    return `Olá, Claudete! Gostaria de saber mais sobre o atendimento de ${name}.`;
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
