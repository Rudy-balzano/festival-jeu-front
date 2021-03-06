import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger(
      'menuState', [
      state('opened', style({
        transform: 'rotateZ(90deg)'
      })),
      state('closed', style({
        transform: 'rotateZ(0)'
      })),
      transition('* => *', animate('500ms ease'))
    ]
    )
  ]
})
export class HeaderComponent implements OnInit {

  position: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.position = 'opened';
  }

  changePosition() {
    if (this.position == 'closed') {
      this.position = 'opened';
    } else {
      this.position = 'closed';
    }
  }

  ngOnInit(): void {
  }

  get connected() {
    return this.authService.connectionState.pipe(map(value => value === 'connected'))
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/connexion'])
  }
}
