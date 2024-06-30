import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BARE_URL } from '../../utils/config';
import { AuthService } from '../../services/auth.service';
// import { getHtmlTagDefinition } from '@angular/compiler';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    // const userId = this.authService.getUserId();
    // const accessToken = this.authService.getAccessToken();

    // console.log('UserId:', userId);
    // console.log('AccessToken:', accessToken);
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu xác nhận không khớp.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    const userId = this.authService.getUserId();
    const accessToken = this.authService.getAccessToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
    const body = { userId: userId, newPassword: this.newPassword };

    // console.log('Request Body:', body);
    // console.log('Request Headers:', headers);

    this.isLoading = true;
    this.http.put<any>(`${BARE_URL}/user/reset-password`, body, { headers })
      .pipe(
        catchError(error => {
          console.error('Reset password error', error);
          this.errorMessage = 'Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại sau.';
          return throwError(error);
        }),
        finalize(() => {
          this.isLoading = false;
          alert('Đặt lại mật khẩu thành công.');
          setTimeout(() => { this.errorMessage = ''; }, 2000);
        })
      )
      .subscribe(response => {
        // console.log('Reset password successful', response);
        this.router.navigate(['/login']);
      });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
