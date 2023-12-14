import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
  map,
  of,
} from 'rxjs';
import { QueryService } from '../services/query.service';

export interface IDepthSetting {
  easy: number;
  medium: number;
  hard: number;
  master: number;
}
@Injectable({
  providedIn: 'root',
})
export class SettingFacade {
  private _depthList = new BehaviorSubject<IDepthSetting | null>(null);

  constructor(private queryService: QueryService) {}

  get depthList$(): Observable<IDepthSetting> {
    return this._depthList.asObservable().pipe(
      filter((res: any) => res),
      distinctUntilChanged()
    );
  }

  set depthList(data: IDepthSetting) {
    this._depthList.next(data);
  }

  getDepthList() {
    return this.queryService
      .auth<{ depth: number }[]>('difficult', 'get')
      .subscribe((res) => {
        this.depthList = {
          easy: res[0].depth,
          medium: res[1].depth,
          hard: res[2].depth,
          master: res[3].depth,
        } as IDepthSetting;
      });
  }

  submitDepth(depthSetting: IDepthSetting) {
    if (
      depthSetting.easy! > 100 ||
      depthSetting.medium! > 100 ||
      depthSetting.hard! > 100 ||
      depthSetting.master! > 100
    ) {
      return of(null);
    }
    return this.queryService.auth<any>('difficult', 'put', [
      { depth: depthSetting.easy },
      { depth: depthSetting.medium },
      { depth: depthSetting.hard },
      { depth: depthSetting.master },
    ]);
  }

  resetDepth() {
    return this.queryService
      .auth<{ depth: number }[]>('difficult/reset', 'put')
      .pipe(
        map((res) => {
          const depthSetting = {
            easy: res[0].depth,
            medium: res[1].depth,
            hard: res[2].depth,
            master: res[3].depth,
          } as IDepthSetting;
          this.depthList = depthSetting;
          return depthSetting;
        })
      );
  }
}
