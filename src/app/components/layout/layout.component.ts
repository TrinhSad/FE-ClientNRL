import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isMenuOpen = false;

  constructor(private cookieService: CookieService, private router:Router) {}

  ngOnInit(): void {
    const accessToken = this.cookieService.get('accessToken');
    if (!accessToken) {
      this.router.navigate(['/login']);
    }
  }

}
