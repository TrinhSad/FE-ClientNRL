import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginOtpComponent } from './pages/login-otp/login-otp.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProofComponent } from './pages/proof/proof.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { ResultsComponent } from './pages/results/results.component';
import { MenuLeftComponent } from './components/menu-left/menu-left.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { ConcernComponent } from './components/concern/concern.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LoginOtpComponent,
    ResetPasswordComponent,
    MenuComponent,
    ProfileComponent,
    NotificationComponent,
    ProofComponent,
    MailboxComponent,
    ResultsComponent,
    MenuLeftComponent,
    ChangePasswordComponent,
    ProgramsComponent,
    ConcernComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
