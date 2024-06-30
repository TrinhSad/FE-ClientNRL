import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BARE_URL } from 'src/app/utils/config';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  proposals: any[] = [];
  currentProposals: any[] = [];
  selectedProposal: any = null;
  currentPage: number = 1;
  proposalsPerPage: number = 6;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getProposals();
  }

  getProposals() {
    const accessToken = this.cookieService.get('accessToken') || '';
    const MSSV = this.cookieService.get('MSSV') || '';

    if (!accessToken || !MSSV) {
      console.error('Access token or MSSV not found in cookies');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const params = { "MSSV": MSSV };

    this.http.get<any>(`${BARE_URL}/propose/get-propose-by-mssv`, { headers, params })
      .subscribe(
        (response) => {
          this.proposals = response.result;

          this.proposals.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          });

          this.loadMore();
        },
        (error) => {
          console.error('Error fetching proposals:', error);
        }
      );
  }

  goPropose() {
    this.router.navigate(['/propose']);
  }

  showProposalDetails(proposal: any) {
    this.selectedProposal = proposal;
  }

  closeProposalDetails() {
    this.selectedProposal = null;
  }

  loadMore() {
    const startIndex = (this.currentPage - 1) * this.proposalsPerPage;
    const endIndex = this.currentPage * this.proposalsPerPage;
    this.currentProposals = this.currentProposals.concat(this.proposals.slice(startIndex, endIndex));
    this.currentPage++;
  }
}
