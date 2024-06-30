import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VAA_URL } from '../../utils/config';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { BARE_URL } from '../../utils/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  VAA_URL = VAA_URL;
  studentInfo: any;
  facultyName: string = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.fetchStudentInfo();
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  }
}
