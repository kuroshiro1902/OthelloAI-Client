import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';
import { EPlayer } from '../shared/constants/Player.constant';
import { IGameStats } from '../shared/models/GameStats.model';

@Injectable({
  providedIn: 'root',
})
export class InitialService {
  constructor(private queryService: QueryService) {}
  initial(firstPlayer: EPlayer): Observable<IGameStats> {
    return this.queryService.post('initialize', { currentPlayer: firstPlayer });
    // return this.queryService.post('initialize', { firstPlayer });
  }
}
