import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BARE_URL } from '../../utils/config';
import { VAA_URL } from '../../utils/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  VAA_URL = VAA_URL;

  MSSV: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.cookieService.check('accessToken')) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    const loginRequest = { MSSV: this.MSSV, password: this.password };
    this.http.post<any>(`${BARE_URL}/auth/login`, loginRequest)
      .pipe(
        catchError(error => {
          console.error('Login error', error);
          this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra lại MSSV và mật khẩu.';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          // console.log('Login successful', response);
          const expiresIn = 7;

          this.cookieService.set('accessToken', response.accessToken, expiresIn);
          this.cookieService.set('refreshToken', response.refreshToken, expiresIn);

          this.cookieService.set('userId', response.user._id, expiresIn);
          this.cookieService.set('fullName', response.user.fullName, expiresIn);
          this.cookieService.set('MSSV', response.user.MSSV, expiresIn);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra lại MSSV và mật khẩu.';
        }
      });
  }
}
