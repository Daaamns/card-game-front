import { Component } from '@angular/core';
import { ClassTypeService } from '../shared/services/class-type.service';
import { Observable } from 'rxjs';
import { ClassType } from '../shared/models/class.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PLayerService } from '../shared/services/player.service';
import { GameService } from '../shared/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  playerForm = this.fb.group({
    player1: [''],
    player2: [''],
  });
  selectedClassPlayer1!: ClassType;
  selectedClassPlayer2!: ClassType;
  currentPlayerSelection: 'player1' | 'player2' = 'player1';

  classType$: Observable<ClassType[]> = this.classService.getClassType$();

  constructor(
    private fb: FormBuilder,
    private classService: ClassTypeService,
    private playerService: PLayerService,
    private gameService: GameService,
    private route: Router
  ) {}

  getTheClass(classType: any): void {
    if (this.currentPlayerSelection === 'player1') {
      this.selectedClassPlayer1 = classType;
      this.currentPlayerSelection = 'player2';
    } else if (this.currentPlayerSelection === 'player2') {
      this.selectedClassPlayer2 = classType;
    }
  }

  startGame(): void {
    const player1Name = this.playerForm.get('player1')?.value;
    const player2Name = this.playerForm.get('player2')?.value;

    if (this.selectedClassPlayer1 && this.selectedClassPlayer2) {
      this.playerService
        .createPlayer(player1Name, this.selectedClassPlayer1.id)
        .subscribe((player1) => {
          this.playerService
            .createPlayer(player2Name, this.selectedClassPlayer2.id)
            .subscribe((player2) => {
              console.log('Players created:', player1, player2);
              const player1Id = player1.id;
              const player2Id = player2.id;

              // Call the service to start the game
              // this.gameService.startNewGame(player1.id, player2.id).subscribe(...);
              this.gameService
                .createGame(player1Id, player2Id)
                .subscribe((gameId) => {
                  console.log('Game started:', gameId);
                  this.route.navigate(['/game', gameId]);
                });
            });
        });
    } else {
      alert('Please select classes for both players');
    }
  }
}
