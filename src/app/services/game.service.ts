import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameMode, GameStatus } from "src/app/components";

@Injectable()
export class GameService {
    public gameStatus$: BehaviorSubject<GameStatus> = new BehaviorSubject<GameStatus>(GameStatus.NotStarted);

    private gameMode: GameMode = GameMode.NotSelected;

    public startGame(gameMode: GameMode): void {
        this.gameStatus$.next(GameStatus.Ongoing);
        this.gameMode = gameMode;
    }

    public getGameMode(): GameMode {
        return this.gameMode;
    }

    public setGameMode(gameMode: GameMode): void {
        this.gameMode = gameMode;
    }
}