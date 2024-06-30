import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  programs: any[] = [];
  totalPoints: number = 0; // Initialize total points
  selectedProgram: any = null; // Track selected program for details

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.loadHistory();
    this.loadUserInformation(); // Call to load user information including points
  }

  loadHistory() {
    const accessToken = this.cookieService.get('accessToken');
    const MSSV = this.cookieService.get('MSSV');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    this.http.get<any>(`http://localhost:4000/api/v1/user/get-history?MSSV=${MSSV}`, { headers }).subscribe(
      (response) => {
        this.programs = response.programs;
      },
      (error) => {
        console.error('Error loading history:', error);
      }
    );
  }

  loadUserInformation() {
    const accessToken = this.cookieService.get('accessToken');
    const userId = this.cookieService.get('userId');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    this.http.get<any>(`http://localhost:4000/api/v1/user/get-information?userId=${userId}`, { headers }).subscribe(
      (response) => {
        this.totalPoints = response.result.infoData.point;
      },
      (error) => {
        console.error('Error loading user information:', error);
      }
    );
  }

  showProgramDetails(program: any) {
    this.selectedProgram = program;
  }

  closeProgramDetails() {
    this.selectedProgram = null;
  }
}
