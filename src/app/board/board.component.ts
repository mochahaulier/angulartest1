import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    TileComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent implements OnInit {
  @Input() xNext: boolean | undefined;
  @Output() xNextChange: EventEmitter<boolean> = new EventEmitter<boolean>();
   
  tiles = Array(9).fill(null);
  
  @Output() hasWinner: EventEmitter<string> = new EventEmitter<string>();
  
  //xNext: boolean | undefined;
  winner: string | undefined;
  isActive = true;
  win = Array(3).fill(null);

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.tiles = Array(9).fill(null);
    this.winner = '';    
    this.isActive = true;
    this.win = Array(3).fill(null);
  }

  get player(): string {
    return this.xNext ? 'X' : 'O';
  }

  setTile(num: number): void {
    if(this.isActive && !this.tiles[num]) {
      this.tiles.splice(num, 1, this.player);
      this.xNext = !this.xNext;
      this.xNextChange.emit(this.xNext);
    }

    this.winner = this.isWinner();
  }

  isWinner(): string | undefined {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c]= lines[i];
      if (this.tiles[a] &&
        this.tiles[a] === this.tiles[b] &&
        this.tiles[a] === this.tiles[c]) {
        this.win = lines[i];
        this.hasWinner.emit(this.xNext ? 'O' : 'X');
        this.isActive = false;
        return this.tiles[a];
      } 
    }

    if (this.tiles.includes(null)) {
        return undefined;
    } else {
        this.isActive = false;
        this.hasWinner.emit('DRAW');
        return 'DRAW'
    }
  }

  trackByFn(index: number) {
    return index;
  }
}
