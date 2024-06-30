import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BARE_URL } from 'src/app/utils/config';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  programs: any[] = [];
  currentPage: number = 1;
  programsPerPage: number = 6;
  programId: string = ''; 

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

    if (!accessToken) {
      console.error('Access token not found in cookies');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const apiUrl = `${BARE_URL}/program/get-public-programs`;

    this.http.get<any>(apiUrl, { headers }).subscribe(
      (response) => {
        this.programs = response.programs;
        this.programId = this.programs[0]._id;
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  viewDetails(programId: string) {
    this.router.navigate(['/programs', programId]);
    window.scrollTo(0, 0);
  }

  goToProgramDetails(programId: string) {
    this.router.navigate(['/programs', programId]);
    window.scrollTo(0, 0);
  }

  getPageCount(): number {
    const totalPrograms = this.programs.length;
    return Math.ceil(totalPrograms / this.programsPerPage);
  }

  getPageNumbers(): number[] {
    const pageCount = this.getPageCount();
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    window.scrollTo(0, 0);
  }

  getCurrentPagePrograms(): any[] {
    const startIndex = (this.currentPage - 1) * this.programsPerPage;
    const endIndex = startIndex + this.programsPerPage;
    return this.programs.slice(startIndex, endIndex);
  }
}
