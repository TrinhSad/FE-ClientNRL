import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BARE_URL } from 'src/app/utils/config';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  program: any;
  private apiUrl = `${BARE_URL}/program/get-program/`;
  canRegister: boolean = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const programId = this.route.snapshot.paramMap.get('programId');
    if (programId) {
      this.getProgram(programId);
    }
  }

  getProgram(programId: string): void {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(`${this.apiUrl}${programId}`, { headers })
      .subscribe(data => {
        this.program = data.program;

        this.canRegister = this.canRegisterNow();
      });
  }

  canRegisterNow(): boolean {
    if (!this.program) {
      return false;
    }

    const registerDate = new Date(this.program.registerDate);
    const currentDate = new Date();

    return currentDate.getTime() >= registerDate.getTime();
  }

  registerProgram(): void {
    if (!this.canRegisterNow()) {
      alert('Đăng ký chưa mở. Vui lòng quay lại sau.');
      return;
    }

    const programId = this.program._id;
    const accessToken = this.cookieService.get('accessToken');

    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    this.http.post<any>(`${BARE_URL}/join-program/register/${programId}`, null, { headers })
      .subscribe(
        (response) => {

          alert('Đăng ký thành công!');
        },
        (error) => {
          alert('Đăng ký thất bại!');
        }
      );
  }

  navigateToPropose(): void {
    const programId = this.program._id;
    this.router.navigate(['/propose', programId]);
  }
}
