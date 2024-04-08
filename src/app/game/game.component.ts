import { Component, ViewChildren, QueryList, OnInit, Input } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { ThemeSelectComponent } from '../theme-select/theme-select.component';
import { trigger, transition, query, group, style, animate } from '@angular/animations';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    BoardComponent,
    ThemeSelectComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  animations: [
      trigger('scaleIt', [
        transition('void => *', [style({opacity: '0', transform: 'scale(130%)'}),
      animate(250)]),
      transition('* => void', [animate(2500, style({opacity: '0'}))]),
      transition('* => *', [style({opacity: '0', transform: 'scale(130%)'}),
      animate(250, style({opacity: '1', transform: 'scale(100%)'}))]),
      ])
  ]
})
export class GameComponent implements OnInit {
  xNext: boolean | undefined;
  @ViewChildren(BoardComponent) childs!:  QueryList<BoardComponent>;

  tiles = Array(9).fill(null);
  gameOver: string | undefined;
  gameState: string | undefined;

  onNewGame() {
    this.xNext = true;
    this.gameOver = undefined;
    this.childs.forEach((element) => element.newGame());
  }  

  setGameState(): string {
    this.gameState = (!this.gameOver) ? (
        (this.xNext ? 'X' : 'O').concat("'s Turn")
    ) : (
      (this.gameOver === 'DRAW') ? "It's a DRAW!" : (
        this.gameOver + ' wins!'
      )
    );  
    return this.gameState;
  }

  onGameOver(winner: string): void {
    this.gameOver = winner;
  }

  ngOnInit(): void {
    this.xNext = true;
  }
}
