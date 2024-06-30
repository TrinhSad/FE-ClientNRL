import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes('login')) {
        this.titleService.setTitle('Đăng nhập');
      } else if (event.urlAfterRedirects.includes('home')) {
        this.titleService.setTitle('Cổng thông tin sinh viên');
      } else if (event.urlAfterRedirects.includes('news')) {
        this.titleService.setTitle('Tin tức và thông báo');
      } else if (event.urlAfterRedirects.includes('notification')) {
        this.titleService.setTitle('Ghi chú nhắc nhở');
      } else if (event.urlAfterRedirects.includes('forgot-password')) {
        this.titleService.setTitle('Quên mật khẩu');
      // } else if (event.urlAfterRedirects.includes('change-password')) {
      //   this.titleService.setTitle('Đổi mật khẩu');
      } else if (event.urlAfterRedirects.includes('login-otp')) {
        this.titleService.setTitle('Xác thực OTP');
      } else if (event.urlAfterRedirects.includes('reset-password')) {
        this.titleService.setTitle('Đặt lại mật khẩu');
      } else if (event.urlAfterRedirects.includes('reset-password')) {
        this.titleService.setTitle('Đặt lại mật khẩu');
      } else if (event.urlAfterRedirects.includes('propose')) {
        this.titleService.setTitle('Yêu cầu sinh viên');
      } else if (event.urlAfterRedirects.includes('mailbox')) {
        this.titleService.setTitle('Yêu cầu sinh viên');
      } else if (event.urlAfterRedirects.includes('result')) {
        this.titleService.setTitle('Kết quả rèn luyện');
      } else if (event.urlAfterRedirects.includes('profile')) {
        this.titleService.setTitle('Thông tin sinh viên');
      } else if (event.urlAfterRedirects.includes('programs/:programId')) {
        this.titleService.setTitle('Chương trình đào tạo');
      }
    });
  }
}
