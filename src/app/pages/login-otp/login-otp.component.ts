// src/app/pages/login-otp/login-otp.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { BARE_URL } from '../../utils/config';
import { VAA_URL } from '../../utils/config';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.css']
})
export class LoginOtpComponent implements OnInit {
  VAA_URL = VAA_URL;

  otp: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  MSSV: string = '';

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {

    this.MSSV = this.authService.getMSSV();
  }

  loginByOTP() {
    const body = { otp: this.otp, MSSV: this.MSSV };
    this.isLoading = true;
    this.http.post<any>(`${BARE_URL}/user/login-by-otp`, body)
      .pipe(
        tap(response => {
          // console.log('Login by OTP successful', response);
          this.authService.setUserId(response.result.infoData._id);
          this.authService.setAccessToken(response.result.accessToken);
          this.router.navigate(['/reset-password']);
        }),
        catchError(error => {
          console.error('Login by OTP error', error);
          if (error.error && error.error.message === 'wrong OTP') {
            this.errorMessage = 'Mã OTP không chính xác. Vui lòng thử lại.';
          } else {
            this.errorMessage = 'Đã xảy ra lỗi khi đăng nhập bằng OTP. Vui lòng thử lại sau.';
          }
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
          return (error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
