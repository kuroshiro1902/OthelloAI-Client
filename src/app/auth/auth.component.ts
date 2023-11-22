import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'signup' = 'login';
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.authForm.invalid) alert('Không được để trống các trường');
    else {
      if (this.mode === 'login') this.login();
      else this.signup();
    }
  }

  changeMode() {
    if (this.mode === 'login') this.mode = 'signup';
    else this.mode = 'login';
  }

  login() {
    const { username, password } = this.authForm.value;
    this.authService.login(username!, password!).subscribe((res) => {
      console.log(res);
    });
  }
  signup() {
    const { username, password } = this.authForm.value;
    this.authService.signup(username!, password!).subscribe((res) => {
      console.log(res);
    });
  }
}
