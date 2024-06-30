import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewsComponent } from './pages/news/news.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { ActivityLogComponent } from './pages/activity-log/activity-log.component';
import { RequestStudentComponent } from './pages/request-student/request-student.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
// import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginOtpComponent } from './pages/login-otp/login-otp.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProofComponent } from './pages/proof/proof.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login-otp', component: LoginOtpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'news', component: NewsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'result', component: ResultsComponent },
      { path: 'activity-log', component: ActivityLogComponent },
      // { path: 'change-password', component: ChangePasswordComponent },
      { path: 'programs/:programId', component: ProgramsComponent},
      { path: 'request-student', component: RequestStudentComponent },
      { path: 'notification', component: NotificationComponent},
      { path: 'propose', component: ProofComponent},
      { path: 'propose/:programId', component: ProofComponent},
      { path: 'mailbox', component: MailboxComponent},
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
