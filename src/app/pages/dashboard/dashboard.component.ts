import { Component, OnInit } from '@angular/core';
import { VAA_URL, BARE_URL } from '../../utils/config';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  showMenuLeft = false;
  studentInfo: any;
  facultyName: string = '';
  VAA_URL = VAA_URL;
  totalNotification: number = 0;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.fetchStudentInfo();
    this.fetchNotifications();
  }

  fetchStudentInfo() {
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
        if (response && response.result) {
          this.studentInfo = response.result.infoData;
          this.facultyName = response.result.facultyName;

          this.studentInfo.birthDay = this.formatDate(this.studentInfo.birthDay);
        } else {
          console.error('Student information or faculty name not found in API response');
        }
      })
    ).subscribe(
      () => {},
      (error) => {
        console.error('Error fetching student info:', error);
      }
    );
  }

  fetchNotifications() {
    const accessToken = this.cookieService.get('accessToken');

    if (!accessToken) {
      console.error('Access token not found in cookies');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const apiUrl = `${BARE_URL}/notification/get-notification`;

    this.http.get(apiUrl, { headers }).pipe(
      tap((response: any) => {
        if (response && response.userNotifications) {
          this.totalNotification = response.userNotifications.length;
        } else {
          console.error('Notifications not found in API response');
        }
      })
    ).subscribe(
      () => {},
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  }
}
