import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent {
  providers = [
    { name: 'Pragmatic Play', logo: '🎯', count: '250+' },
    { name: 'Evolution',       logo: '⚡', count: '180+' },
    { name: 'NetEnt',          logo: '🎲', count: '120+' },
    { name: 'Playtech',        logo: '🌟', count: '200+' },
    { name: 'Microgaming',     logo: '🃏', count: '300+' },
    { name: 'Yggdrasil',       logo: '🔮', count: '90+'  },
    { name: "Play'n GO",       logo: '🎪', count: '140+' },
    { name: 'Red Tiger',       logo: '🏆', count: '80+'  },
    { name: 'Hacksaw',         logo: '🚀', count: '60+'  },
    { name: 'Push Gaming',     logo: '💫', count: '45+'  },
    { name: 'Relax Gaming',    logo: '🎰', count: '70+'  },
    { name: 'Thunderkick',     logo: '🌊', count: '35+'  },
  ];
}
