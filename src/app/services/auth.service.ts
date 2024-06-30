import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private MSSV: string = '';
  private userId: string = '';
  private accessToken: string = '';
  private fullName: string = '';

  constructor() {}

  setMSSV(MSSV: string): void {
    this.MSSV = MSSV;
  }

  getMSSV(): string {
    return this.MSSV;
  }
  setfullName(fullName: string): void {
    this.fullName = fullName;
  }

  getfullName(): string {
    return this.fullName;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }
}
