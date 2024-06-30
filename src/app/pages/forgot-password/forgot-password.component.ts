// src/app/pages/forgot-password/forgot-password.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { BARE_URL } from '../../utils/config';
import { VAA_URL } from '../../utils/config';
// import { throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  VAA_URL = VAA_URL;

  MSSV: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  forgotPassword() {
    const body = { MSSV: this.MSSV };
    this.isLoading = true;

    this.http.post<any>(`${BARE_URL}/user/forgot-password`, body).pipe(
      catchError(error => {
        console.error('Forgot password error', error);
        this.errorMessage = 'Unable to reset password. Please try again later.';
        return (error);
      }),
      finalize(() => {
        this.isLoading = false;
        setTimeout(() => { this.errorMessage = ''; }, 2000);
      })
    ).subscribe(response => {
      console.log('Forgot password successful', response);
      this.authService.setMSSV(this.MSSV);
      this.router.navigate(['/login-otp']);
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
