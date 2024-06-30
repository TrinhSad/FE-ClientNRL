import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../../shared/change-password/change-password.component';
import { VAA_URL } from '../../utils/config';
import { tap, catchError } from 'rxjs/operators';
import { BARE_URL } from '../../utils/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  VAA_URL = VAA_URL;
  dropdownVisible: boolean = false;
  fullName: string = '';

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  toggleDropdown(event: Event) {
    this.dropdownVisible = !this.dropdownVisible;
    event.stopPropagation();
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dropdownVisible = false;
    });
  }

  logoutAccount() {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
    this.router.navigate(['/login']);
  }

  fetchUserInfo() {
    const userId = this.cookieService.get('userId');
    const accessToken = this.cookieService.get('accessToken');

    if (!userId || !accessToken) {
      console.error('User ID or access token not found in cookies');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const apiUrl = `${BARE_URL}/user/get-information?userId=${userId}`;

    this.http.get(apiUrl, { headers }).pipe(
      tap((response: any) => {
        if (!response || !response.result || !response.result.infoData) {
          throw new Error('User information not found');
        }
        this.fullName = response.result.infoData.fullName;
      }),
      catchError((error) => {
        console.error('Error fetching user info:', error);
        return [];
      })
    ).subscribe();
  }
}
