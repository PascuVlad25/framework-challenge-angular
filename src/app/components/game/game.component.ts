import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map, throttleTime } from 'rxjs/operators'
import { GameService } from 'src/app/services';
import { GameMode, GameStatus, GameTile, PlayerStyleClass } from './enums';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('dropAnimation', [
      transition(':enter', []),
      transition('* => *', 
        animate('{{dropAnimationTransitionMs}}ms ease-in', style({
          transform: 'translateY({{distance}}px)'
        })), {params: {dropAnimationTransitionMs: 500, distance: 300}}
      )
    ])
  ]
})
export class GameComponent implements OnInit, OnDestroy {
    @ViewChild('gameTile') gameTile: ElementRef | undefined;
    public gameMatrix: GameTile[][] = [];
    public columnsEmptySpots: number[] = [];
    public isGameOn = true;

    private clicksDebounce = new Subject<number>();
    private numberOfColumns = 7;
    private numberOfRows = 7;
    private streakToWin = 4;
    private currentPlayer = GameTile.Player1;
    private selectedColumns: number[] = [];
    private subscriptions: Subscription[] = [];

    constructor(private gameService: GameService) { }

    public ngOnInit(): void {        
        this.createGameMatrix();
        this.subscribeToIsGameOn();
        this.subscribeToClicksDebounce();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public selectColumn(columnIndex: number): void {
        this.clicksDebounce.next(columnIndex);
    }

    public chooseColumn(columnIndex: number): void {
        const firstEmptyTileIndex = this.gameMatrix[columnIndex].indexOf(GameTile.Empty);

            if (firstEmptyTileIndex !== -1) {
                this.columnsEmptySpots[columnIndex] -= 1;
                this.selectedColumns[columnIndex] = 1;

                setTimeout(() => {
                    this.gameMatrix[columnIndex][firstEmptyTileIndex] = this.currentPlayer;
                    this.selectedColumns[columnIndex] = 0;
                    this.checkMoveForWin(columnIndex, firstEmptyTileIndex);
                }, this.getDropAnimationTransitionMs(columnIndex));
            }
    }

    public getTileColor(tile: GameTile): string {
        switch(tile) {
        case GameTile.Player1:
            return PlayerStyleClass.Player1;
        case GameTile.Player2:
            return PlayerStyleClass.Player2;
        default:
            return '';
        }
    }

    public getMoveSelectorClass(columnIndex: number): string {
        return `${this.getCurrentPlayerClass()} ${this.getColumnSelectedClass(columnIndex)} ${this.getMoveSelectorDisabledClass()}`;
    }

    public getMoveSelectorAnimationOptions(columnIndex: number): any {
        const rowsHeight = this.columnsEmptySpots[columnIndex] + 1;
        const heigthOfTile = this.getTileHeight() * 1.21;
        const distance = rowsHeight * heigthOfTile;
        const dropAnimationTransitionMs = this.getDropAnimationTransitionMs(columnIndex);
        return {
            value: this.columnsEmptySpots[columnIndex],
            params: { dropAnimationTransitionMs, distance }
        };
    }

    public isBotMove(): boolean {
        return this.gameService.getGameMode() === GameMode.PlayerVsBot && this.currentPlayer === GameTile.Player2;
    }

    private getCurrentPlayerClass(): string {
        return this.currentPlayer === GameTile.Player1 ? PlayerStyleClass.Player1 : PlayerStyleClass.Player2;
    }

    private getMoveSelectorDisabledClass(): string {
        return !this.isGameOn || this.isBotMove() ? 'disabled' : '';
    }

    private getColumnSelectedClass(columnIndex: number): string {
        return this.selectedColumns[columnIndex] ? 'selected' : '';
    }

    private getDropAnimationTransitionMs(columnIndex: number): number {
        return 100 + this.columnsEmptySpots[columnIndex] * this.getTileHeight();
    }

    private getTileHeight(): number {
        return this.gameTile?.nativeElement.offsetHeight;
    }

    private subscribeToIsGameOn(): void {
        const subscription = this.gameService.gameStatus$.pipe(
            map((gameStatus) => gameStatus === GameStatus.Ongoing)
        ).subscribe((isGameOn) => {
            this.isGameOn = isGameOn;
        });
        this.subscriptions.push(subscription);
    } 

    private subscribeToClicksDebounce(): void {
        const subscription = this.clicksDebounce.pipe(
            throttleTime(1000)
        ).subscribe((columnIndex: number) => {
            this.chooseColumn(columnIndex);
        });

        this.subscriptions.push(subscription);
    } 

    private createGameMatrix(): void {
        this.gameMatrix = Array(this.numberOfRows);

        for(let i = 0; i < this.numberOfRows; i++) {
            this.gameMatrix[i] = Array(this.numberOfColumns).fill(GameTile.Empty);
            this.columnsEmptySpots.push(this.numberOfRows);
            this.selectedColumns.push(0);
        }
    }

    private checkRow(xPosition: number, yPosition: number): boolean {
        const rangeToCheck = this.streakToWin - 1;
        const startIndex = (xPosition - rangeToCheck) < 0 ? 0 : xPosition - rangeToCheck;
        const endIndex = xPosition + rangeToCheck < this.numberOfColumns ? xPosition + rangeToCheck : this.numberOfColumns - 1;
        let streakCounter = 0;

        for(let i = startIndex; i <= endIndex; i++) {
            if(this.gameMatrix[i][yPosition] === this.currentPlayer) {
                streakCounter += 1;
                if(streakCounter === this.streakToWin) {
                    return true;
                }
            } else {
                streakCounter = 0;
            }
        }
        return false;
    }

    private checkColumn(xPosition: number, yPosition: number): boolean {
        const rangeToCheck = this.streakToWin - 1;
        const startIndex = (yPosition - rangeToCheck) < 0 ? 0 : yPosition - rangeToCheck;
        const endIndex = yPosition + rangeToCheck < this.numberOfRows ? yPosition + rangeToCheck : this.numberOfRows - 1;
        let streakCounter = 0;
        
        for(let i = startIndex; i <= endIndex; i++) {
            if(this.gameMatrix[xPosition][i] === this.currentPlayer) {
                streakCounter += 1;
                if(streakCounter === this.streakToWin) {
                    return true;
                }
            } else {
                streakCounter = 0;
            }
        }
        return false;
    }  

    private checkFirstDiagonal(xPosition: number, yPosition: number): boolean {
        const rangeToCheck = this.streakToWin - 1;
        const startStep = 0 - Math.min(xPosition, yPosition, rangeToCheck);
        const endStep = Math.min(this.numberOfRows - xPosition - 1, this.numberOfColumns - yPosition - 1, rangeToCheck);
        let streakCounter = 0;
        
        for(let step = startStep; step <= endStep; step++) {
            if(this.gameMatrix[xPosition + step][yPosition + step] === this.currentPlayer) {
                streakCounter += 1;
                if(streakCounter === this.streakToWin) {  
                    return true;
                }
            } else {
                streakCounter = 0;
            }
        }
        return false;
    }

    private checkSecondDiagonal(xPosition: number, yPosition: number): boolean {
        const rangeToCheck = this.streakToWin - 1;
        const startStep = 0 - Math.min(this.numberOfRows - xPosition - 1, yPosition, rangeToCheck);
        const endStep = Math.min(xPosition, this.numberOfColumns - yPosition - 1, rangeToCheck);
        let streakCounter = 0;
        for(let step = startStep; step <= endStep; step++) {
            if(this.gameMatrix[xPosition - step][yPosition + step] === this.currentPlayer) {
                streakCounter += 1;
                if(streakCounter === this.streakToWin) {  
                    return true;
                }
            } else {
                streakCounter = 0;
            }
        }
        return false;
    }
  
    private isDraw(): boolean {
        return this.columnsEmptySpots.find((emptySpots) => emptySpots > 0) === undefined;
    }

    private botMove(): void {
        let randomColumnIndex = 0;
        do {
            randomColumnIndex = Math.floor(Math.random() * this.numberOfColumns);
        } while (this.columnsEmptySpots[randomColumnIndex] === 0);

        this.chooseColumn(randomColumnIndex);
    }

    private changePlayerTurn(): void {
        this.currentPlayer = this.currentPlayer === GameTile.Player1 ? GameTile.Player2 : GameTile.Player1;

        if(this.gameService.getGameMode() === GameMode.PlayerVsBot && this.currentPlayer === GameTile.Player2) {
            setTimeout(() => { 
                this.botMove();
            }, 1000);
        }
    }

    private checkMoveForWin(xPosition: number, yPosition: number): boolean {
        if(this.isDraw()) {
            alert('It is a DRAW!');
            this.gameService.gameStatus$.next(GameStatus.Draw);
        } else if(
            this.checkRow(xPosition, yPosition) || 
            this.checkColumn(xPosition, yPosition) ||
            this.checkFirstDiagonal(xPosition, yPosition) ||
            this.checkSecondDiagonal(xPosition, yPosition)
        ) {
            alert(GameTile[this.currentPlayer] + ' a castigat');
            const wonStatus = this.currentPlayer === GameTile.Player1 ? GameStatus.Player1Won : GameStatus.Player2Won;
            this.gameService.gameStatus$.next(wonStatus);
        } else {
            this.changePlayerTurn();
            return false;
        }
        return true;
    }
}
