import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  username: null | string = null;

  ngOnInit(): void {
    this.username = localStorage.getItem('othello_username');
  }
  play(): void {
    if (!!!this.username) this.router.navigate(['/auth']);
    else this.router.navigate(['/game']);
  }
  setting(): void {
    if (!!!this.username) this.router.navigate(['/auth']);
    else this.router.navigate(['setting']);
  }
  docs(): void {
    window.open(
      'http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config',
      '_blank'
    );
  }
  rule(): void {
    window.open(
      'https://www.worldothello.org/about/about-othello/othello-rules/official-rules/english',
      '_blank'
    );
  }
  github(): void {
    window.open('https://github.com/kuroshiro1902/OthelloAI', '_blank');
  }
  logout() {
    localStorage.removeItem('othello_username');
    localStorage.removeItem('othello_token');
    this.username = null;
  }
}
