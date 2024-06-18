import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environements/environment';
import { Game } from '../models/Game.type';
import { Card } from '../models/Card.type';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // private gameDetailsSubject: BehaviorSubject<Game | null> =
  //   new BehaviorSubject<Game | null>(null);
  // gameDetails$: Observable<Game | null> =
  //   this.gameDetailsSubject.asObservable();
  constructor(private http: HttpClient) {}

  public getGame() {}

  public getGameDetails(gameId: number): Observable<Game> {
    return this.http.get<Game>(
      `${environment.database.path}/game/get/${gameId}`
    );
  }

  public getCardDetails(cardId: number): Observable<Card> {
    return this.http.get<Card>(
      `${environment.database.path}/card/get/${cardId}`
    );
  }

  public createGame(player1Id: number, player2Id: number): Observable<any> {
    return this.http.post<any>(`${environment.database.path}/game/start`, {
      player1Id,
      player2Id,
    });
  }

  processTurn(
    gameId: number,
    player1CardId: number,
    player2CardId: number
  ): Observable<void> {
    return this.http.post<void>(
      `${environment.database.path}/game/${gameId}/processTurn`,
      {
        player1CardId,
        player2CardId,
      }
    );
  }
  // getCardDetails(cardId: number) {}
}
