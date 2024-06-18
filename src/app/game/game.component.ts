import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../shared/services/game.service';
import { Game } from '../shared/models/Game.type';
import { Observable, switchMap } from 'rxjs';
import { Card } from '../shared/models/Card.type';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  game$!: Observable<Game>;
  player1Card!: Card | undefined;
  player2Card!: Card | undefined;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.game$ = this.route.params.pipe(
      switchMap((params) => {
        const gameId = +params['id'];
        return this.gameService.getGameDetails(gameId);
      })
    );
  }

  onCardScanned(cardId: number) {
    // Assuming 'detail' property holds the data
    console.log('scanned', cardId);

    this.gameService.getCardDetails(cardId).subscribe((card: Card) => {
      console.log(card);

      if (!this.player1Card) {
        this.player1Card = card;
      } else {
        this.player2Card = card;
      }
    });
  }

  processTurn(): void {
    const gameId = this.route.snapshot.params['id'];
    if (this.player1Card && this.player2Card) {
      this.gameService
        .processTurn(gameId, this.player1Card.id, this.player2Card.id)
        .subscribe(() => {
          // After processing the turn, you might want to update the game state
          this.game$ = this.gameService.getGameDetails(gameId);
          // Reset the scanned cards for the next turn
          this.player1Card = undefined;
          this.player2Card = undefined;
        });
    }
  }

  getLifePercentage(life: number): number {
    const maxLife = 100;
    return (life / maxLife) * 100;
  }

  getArmorPercentage(armor: number): number {
    const maxArmor = 10; // Remplacez ceci par la valeur maximale d'armure réelle si nécessaire
    return (armor / maxArmor) * 100;
  }
}
