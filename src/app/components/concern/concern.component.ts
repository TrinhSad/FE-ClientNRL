import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BARE_URL } from 'src/app/utils/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concern',
  templateUrl: './concern.component.html',
  styleUrls: ['./concern.component.css']
})
export class ConcernComponent implements OnInit {
  programs: any[] = [];
  apiUrl = `${BARE_URL}/program/get-program-sort-register-date`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPrograms();
  }

  fetchPrograms() {
    const accessToken = this.cookieService.get('accessToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });

    this.http.get<any>(this.apiUrl, { headers }).subscribe(
      (response) => {
        this.programs = response.programs.slice(0, 5);
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách chương trình:', error);
      }
    );
  }

  goToProgramDetail(programId: string) {
    this.router.navigateByUrl(`/programs/${programId}`, { skipLocationChange: false }).then(() => {
      window.location.reload();
    });
  }
}
