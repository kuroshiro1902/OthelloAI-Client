import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';
import { Player } from '../shared/constants/Player.constant';
import { IGameStats } from '../shared/models/GameStats.model';

@Injectable({
  providedIn: 'root',
})
export class InitialService {
  constructor(private queryService: QueryService) {}
  initial(currentPlayer: Player): Observable<IGameStats> {
    return this.queryService.post('initialize', { currentPlayer });
  }
}
