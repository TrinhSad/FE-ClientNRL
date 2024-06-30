import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BARE_URL } from 'src/app/utils/config';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  currentNotifications: any[] = [];
  currentPage: number = 1;
  notificationsPerPage: number = 4;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    const accessToken = this.cookieService.get('accessToken') || '';

    if (!accessToken) {
      console.error('Access token not found in cookies');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    this.http.get<any>(`${BARE_URL}/notification/get-notification`, { headers })
      .subscribe(
        (response) => {
          this.notifications = response.userNotifications
            .filter((notification: any) => notification.notificationId !== null)
            .sort((a: any, b: any) => {
              const dateA = new Date(a.notificationId.createdAt).getTime();
              const dateB = new Date(b.notificationId.createdAt).getTime();
              return dateB - dateA;
            });

          this.cookieService.set('TotalNotification', this.notifications.length.toString());
          this.loadMore();
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
      );
  }

  toggleMessage(index: number) {
    const notification = this.currentNotifications[index];
    notification.showMessage = !notification.showMessage;

    if (!notification.isRead) {
      const notificationId = notification.notificationId._id; 

      const accessToken = this.cookieService.get('accessToken') || '';

      if (!accessToken) {
        console.error('Access token not found in cookies');
        return;
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      });

      this.http.put<any>(`${BARE_URL}/notification/mark-as-read/${notificationId}`, {}, { headers })
        .subscribe(
          (response) => {
            if (response.userNotification.isRead) {
              notification.isRead = true;
            }
          },
          (error) => {
            console.error('Error marking notification as read:', error);
          }
        );
    }
  }

  loadMore() {
    const startIndex = (this.currentPage - 1) * this.notificationsPerPage;
    const endIndex = this.currentPage * this.notificationsPerPage;
    this.currentNotifications = this.currentNotifications.concat(this.notifications.slice(startIndex, endIndex));
    this.currentPage++;
  }
}
