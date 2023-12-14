import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDepthSetting, SettingFacade } from './setting.facade';
import { take } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  initial = true;
  depthSetting: null | IDepthSetting = null;
  constructor(private router: Router, private settingFacade: SettingFacade) {}

  ngOnInit(): void {
    const token = localStorage.getItem('othello_token');
    if (!!!token) {
      this.router.navigate(['/']);
    } else {
      this.settingFacade.depthList$.subscribe((res) => {
        this.depthSetting = res;
      });
    }
  }

  home() {
    this.router.navigate(['/']);
  }

  getDepthList() {
    this.settingFacade.getDepthList();
  }

  submitDepth() {
    this.settingFacade
      .submitDepth(this.depthSetting!)
      .pipe(take(1))
      .subscribe((res) => {
        if (res !== null) {
          alert('Update depth successfully!');
        } else {
          alert('Depth should not exceed 100');
        }
      });
  }

  resetDepth() {
    if (confirm('Do you want to reset level?')) {
      this.settingFacade
        .resetDepth()
        .pipe(take(1))
        .subscribe((res) => {
          alert('Update successful!');
        });
    }
  }
}
