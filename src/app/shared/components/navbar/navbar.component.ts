import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  login: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') && localStorage.getItem('role')) {
      this.login = true;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
