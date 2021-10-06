import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services';
import { GameMode, GameStatus } from '../game/enums';

@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit, OnDestroy {
    private gameStatus: GameStatus = GameStatus.NotStarted;
    private subscriptions: Subscription[] = [];

    constructor(private gameService: GameService) { }

    public ngOnInit(): void {
        this.subscribeToGameStatus();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public startBotGame(): void {
        this.startGame(GameMode.PlayerVsBot);
    }

    public startPlayerGame(): void {
        this.startGame(GameMode.PlayerVsPlayer);
    }

    public hasGameStarted(): boolean {
        return this.gameStatus !== GameStatus.NotStarted;
    }

    private startGame(gameMode: GameMode): void {
        this.gameService.gameStatus$.next(GameStatus.Ongoing);
        this.gameService.setGameMode(gameMode);
    }

    private subscribeToGameStatus(): void {
        const subscription = this.gameService.gameStatus$.subscribe((gameStatus) => {
            this.gameStatus = gameStatus;
        });
        this.subscriptions.push(subscription);
    }
}
