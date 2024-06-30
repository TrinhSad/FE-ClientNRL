import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { BARE_URL } from '../../utils/config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  isVisible: boolean = true;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  closePopup() {
    this.dialogRef.close();
  }

  changePassword() {
    const accessToken = this.cookieService.get('accessToken') || '';
    const apiUrl = `${BARE_URL}/user/change-password`;

    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const body = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.http.put(apiUrl, body, { headers }).subscribe(
      (response: any) => {
        alert('Đổi mật khẩu thành công!');
        this.closePopup();
      },
      (error) => {
        alert('Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.');
      }
    );
  }
}
