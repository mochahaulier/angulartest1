import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  providers: [
    ThemeService
  ]
})

export class TileComponent {
  @Input() value: 'X' | 'O' | undefined;
  @Input() player: boolean | undefined;
  @Input() isActive: boolean | undefined;
  @Input() isWin: boolean | undefined;

  @Output() onClickity = new EventEmitter<boolean>();
}
