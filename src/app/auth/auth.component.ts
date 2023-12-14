import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'signup' = 'login';
  error: string | null = null;
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

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
      if (!res.accessToken) {
        this.error = 'Wrong username or password!';
      } else {
        localStorage.setItem('othello_username', username!);
        localStorage.setItem('othello_token', res.accessToken);
        this.router.navigate(['/']);
      }
    });
  }
  signup() {
    const { username, password } = this.authForm.value;
    this.authService.signup(username!, password!).subscribe((res) => {
      if (!res.accessToken) {
        this.error = 'Username already exists!';
      } else {
        localStorage.setItem('othello_username', username!);
        localStorage.setItem('othello_token', res.accessToken);
        this.router.navigate(['/']);
      }
    });
  }
}
